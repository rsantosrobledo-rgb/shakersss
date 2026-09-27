/**
 * SHAKERSSS — Data Service & Supabase Layer
 * Central data management for Creators & Success Cases.
 * Works seamlessly offline / with LocalStorage, and automatically syncs
 * with Supabase Cloud DB when credentials are provided.
 */

// --- Default Data Fallbacks (Initially empty — creators uploaded via Admin) ---
const DEFAULT_CREATORS = [];

// --- Default Success Cases (7 real cases) ---
const DEFAULT_CASES = [
    {
        id: 'case-1',
        brand: 'TACO BELL',
        title: 'Sweet Cap Drop',
        meta: '+4.2M Views · 85% Engagement',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=480&q=80',
        bowl: 'bol_mint.png?v=sat_v2',
        spoon: 'cuchara_1.png',
        spoonSide: 'spoon-left',
        stain: 'stain-top-right'
    },
    {
        id: 'case-2',
        brand: 'SPOTIFY',
        title: 'Luna Top Charts',
        meta: '+1.8M Streams · #1 Viral',
        photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=480&q=80',
        bowl: 'bol_pink.png?v=sat_v2',
        spoon: 'cuchara_2.png',
        spoonSide: 'spoon-right',
        stain: 'stain-bottom-left'
    },
    {
        id: 'case-3',
        brand: 'RED BULL',
        title: 'Extreme Shake',
        meta: '12M Reach · 98% ROI',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=480&q=80',
        bowl: 'bol_yellow.png?v=sat_v2',
        spoon: 'cuchara_1.png',
        spoonSide: 'spoon-left',
        stain: 'stain-top-left'
    },
    {
        id: 'case-4',
        brand: 'NIKE',
        title: 'Air Shakers Drop',
        meta: '8.5M Impressions · Sold Out',
        photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=480&q=80',
        bowl: 'bol_purple.png?v=sat_v2',
        spoon: 'cuchara_2.png',
        spoonSide: 'spoon-right',
        stain: 'stain-bottom-right'
    },
    {
        id: 'case-5',
        brand: 'APPLE',
        title: 'Shot on iPhone',
        meta: '15M Views · Top Creator',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=480&q=80',
        bowl: 'bol_blue.png?v=sat_v2',
        spoon: 'cuchara_1.png',
        spoonSide: 'spoon-left',
        stain: 'stain-spoon-edge'
    },
    {
        id: 'case-6',
        brand: 'JOSE CUERVO',
        title: 'Summer Fiesta',
        meta: '+6.4M Reach · +350% Engagement',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=480&q=80',
        bowl: 'bol_orange.png?v=sat_v2',
        spoon: 'cuchara_2.png',
        spoonSide: 'spoon-right',
        stain: 'stain-top-left'
    },
    {
        id: 'case-7',
        brand: 'PRINGLES',
        title: 'Flavor Crunch',
        meta: '3.9M Views · Trending #1',
        photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=480&q=80',
        bowl: 'bol_red.png?v=sat_v2',
        spoon: 'cuchara_1.png',
        spoonSide: 'spoon-left',
        stain: 'stain-bottom-right'
    }
];

const DEFAULT_SUPABASE_URL = 'https://agdijusckodlcjwiogil.supabase.co';
const DEFAULT_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnZGlqdXNja29kbGNqd2lvZ2lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0MjkzNDIsImV4cCI6MjEwNjAwNTM0Mn0.BfjBKrLUz9pKDMVogEO0hKLE5-MHOnQCGOQvA3K81O0';

// --- High-fidelity transparent cutouts for duotone multiply cereal box rendering ---
const KNOWN_CUTOUTS = {
    'pima': 'cutouts/pima.png',
    'modelo 1': 'cutouts/modelo_1.png',
    'modelo 2': 'cutouts/modelo_2.png',
    'modelo 4': 'cutouts/modelo_4.png',
    'modelo 5': 'cutouts/modelo_5.png',
    'modelo 6': 'cutouts/modelo_6.png',
    'bruno casanova': 'bruno_casanova_cutout.png',
    'luna': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
};

// --- IndexedDB Offline Storage Layer (Unlimited storage for Cutouts & Images) ---
const IDB_DB_NAME = 'shakersss_offline_db';
const IDB_STORE_NAME = 'shakersss_kv';
const IDB_VERSION = 1;

function openShakersssIDB() {
    return new Promise((resolve) => {
        if (typeof window === 'undefined' || !window.indexedDB) {
            resolve(null);
            return;
        }
        try {
            const req = window.indexedDB.open(IDB_DB_NAME, IDB_VERSION);
            req.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(IDB_STORE_NAME)) {
                    db.createObjectStore(IDB_STORE_NAME);
                }
            };
            req.onsuccess = (e) => resolve(e.target.result);
            req.onerror = (e) => {
                console.warn('[ShakersssData] IndexedDB open error:', e);
                resolve(null);
            };
        } catch (err) {
            resolve(null);
        }
    });
}

async function idbGet(key) {
    try {
        const db = await openShakersssIDB();
        if (!db) return null;
        return new Promise((resolve) => {
            const tx = db.transaction(IDB_STORE_NAME, 'readonly');
            const store = tx.objectStore(IDB_STORE_NAME);
            const req = store.get(key);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => resolve(null);
        });
    } catch (err) {
        return null;
    }
}

async function idbSet(key, value) {
    try {
        const db = await openShakersssIDB();
        if (!db) return false;
        return new Promise((resolve) => {
            const tx = db.transaction(IDB_STORE_NAME, 'readwrite');
            const store = tx.objectStore(IDB_STORE_NAME);
            const req = store.put(value, key);
            req.onsuccess = () => resolve(true);
            req.onerror = () => resolve(false);
        });
    } catch (err) {
        return false;
    }
}

async function idbDelete(key) {
    try {
        const db = await openShakersssIDB();
        if (!db) return false;
        return new Promise((resolve) => {
            const tx = db.transaction(IDB_STORE_NAME, 'readwrite');
            const store = tx.objectStore(IDB_STORE_NAME);
            const req = store.delete(key);
            req.onsuccess = () => resolve(true);
            req.onerror = () => resolve(false);
        });
    } catch (err) {
        return false;
    }
}

class ShakersssDataService {
    constructor() {
        this.STORAGE_KEY_CREATORS = 'shakersss_creators_v6';
        this.STORAGE_KEY_CASES = 'shakersss_cases_v1';
        this.STORAGE_KEY_SUPABASE = 'shakersss_supabase_cfg_v1';
        this.supabaseClient = null;

        // Clean migration: drop old mock stores so no previous mock influencers remain
        const MIGRATION_KEY = 'shakersss_v6_cleared_all';
        if (typeof window !== 'undefined' && window.localStorage && localStorage.getItem(MIGRATION_KEY) !== 'true') {
            try {
                localStorage.removeItem('shakersss_creators_v1');
                localStorage.removeItem('shakersss_creators_cleaned_v3');
                localStorage.removeItem('shakersss_creators_v4');
                localStorage.removeItem('shakersss_creators_v5');
                localStorage.removeItem(this.STORAGE_KEY_CREATORS);
                idbDelete('shakersss_creators_v1');
                idbDelete('shakersss_creators_cleaned_v3');
                idbDelete('shakersss_creators_v4');
                idbDelete('shakersss_creators_v5');
                idbDelete(this.STORAGE_KEY_CREATORS);
                localStorage.setItem(MIGRATION_KEY, 'true');
            } catch (e) {}
        }

        this.initSupabaseClient();
    }

    // --- Supabase Config & Initialization ---
    getSupabaseConfig() {
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY_SUPABASE);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed.url && parsed.key) return parsed;
            }
        } catch (e) {}
        return {
            url: DEFAULT_SUPABASE_URL,
            key: DEFAULT_SUPABASE_KEY
        };
    }

    saveSupabaseConfig(url, key) {
        localStorage.setItem(this.STORAGE_KEY_SUPABASE, JSON.stringify({ url: url.trim(), key: key.trim() }));
        this.initSupabaseClient();
    }

    initSupabaseClient() {
        const cfg = this.getSupabaseConfig();
        if (cfg.url && cfg.key && window.supabase && window.supabase.createClient) {
            try {
                this.supabaseClient = window.supabase.createClient(cfg.url, cfg.key);
                console.log('[ShakersssData] Supabase Client Initialized!');
            } catch (err) {
                console.warn('[ShakersssData] Supabase initialization failed:', err);
                this.supabaseClient = null;
            }
        } else {
            this.supabaseClient = null;
        }
    }

    isSupabaseConnected() {
        return !!this.supabaseClient;
    }

    // Downscale and compress images on canvas to guarantee small payloads (<250KB)
    async _optimizeImage(fileOrBlob, isPng = false) {
        if (!fileOrBlob || typeof window === 'undefined' || !window.Image) return fileOrBlob;

        return new Promise((resolve) => {
            const img = new Image();
            const objectUrl = URL.createObjectURL(fileOrBlob);

            img.onload = () => {
                URL.revokeObjectURL(objectUrl);
                const maxDim = 700;
                let width = img.width;
                let height = img.height;

                if (width > maxDim || height > maxDim) {
                    if (width > height) {
                        height = Math.round((height * maxDim) / width);
                        width = maxDim;
                    } else {
                        width = Math.round((width * maxDim) / height);
                        height = maxDim;
                    }
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                if (isPng) {
                    canvas.toBlob((blob) => {
                        resolve(blob || fileOrBlob);
                    }, 'image/png');
                } else {
                    canvas.toBlob((blob) => {
                        resolve(blob || fileOrBlob);
                    }, 'image/jpeg', 0.82);
                }
            };

            img.onerror = () => {
                URL.revokeObjectURL(objectUrl);
                resolve(fileOrBlob);
            };

            img.src = objectUrl;
        });
    }

    // --- Image Upload: Supabase Storage + FileReader Base64 Fallback ---
    async uploadImage(file, folder = 'creators') {
        if (!file) throw new Error('No se ha proporcionado ningún archivo');

        const isPng = folder === 'creators_png' || (file.type && file.type.includes('png'));
        let processedFile = file;

        // Auto-optimize image size
        try {
            const optimizedBlob = await this._optimizeImage(file, isPng);
            if (optimizedBlob) {
                const name = file.name || (isPng ? 'cutout.png' : 'image.jpg');
                processedFile = new File([optimizedBlob], name, { type: isPng ? 'image/png' : 'image/jpeg' });
            }
        } catch (e) {
            console.warn('[ShakersssData] Image optimization notice:', e);
        }

        // 1. Try Supabase Storage if client is initialized
        if (this.supabaseClient && this.supabaseClient.storage) {
            try {
                const cleanName = (processedFile.name || 'image.jpg').replace(/[^a-zA-Z0-9.-]/g, '_');
                const filePath = `${folder}/${Date.now()}_${cleanName}`;
                
                const { data, error } = await this.supabaseClient.storage
                    .from('shakersss-media')
                    .upload(filePath, processedFile, {
                        cacheControl: '3600',
                        upsert: true
                    });

                if (!error && data) {
                    const { data: publicData } = this.supabaseClient.storage
                        .from('shakersss-media')
                        .getPublicUrl(filePath);

                    if (publicData && publicData.publicUrl) {
                        return {
                            success: true,
                            url: publicData.publicUrl,
                            source: 'supabase',
                            message: 'Imagen subida a Supabase Storage con éxito.'
                        };
                    }
                } else {
                    console.warn('[ShakersssData] Supabase Storage error, usando fallback Base64:', error);
                }
            } catch (storageErr) {
                console.warn('[ShakersssData] Excepción en Supabase Storage, usando fallback Base64:', storageErr);
            }
        }

        // 2. Fallback to Local Base64 FileReader (using the optimized file!)
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve({
                    success: true,
                    url: e.target.result,
                    source: 'local',
                    message: 'Imagen guardada localmente (Base64 optimizado).'
                });
            };
            reader.onerror = (err) => reject(err);
            reader.readAsDataURL(processedFile);
        });
    }

    // --- Creators Management ---
    _normalizeCreator(c) {
        const rawSettings = c.boxSettings || c.box_settings || {};
        let cleanName = c.name || 'Creador';
        // Clean trailing timestamps e.g. 20260927103022, (1) suffixes, and file extensions
        cleanName = cleanName.replace(/\b20\d{8,}\b/g, '')
                             .replace(/\b17\d{10,}\b/g, '')
                             .replace(/\b\d{10,16}\b/g, '')
                             .replace(/\(\d+\)/g, '')
                             .replace(/\b(png|jpg|jpeg|webp)\b/gi, '')
                             .replace(/[-_.]+/g, ' ')
                             .replace(/\s+/g, ' ')
                             .trim();
        const modeloMatch = cleanName.match(/^modelo\s*(\d+)/i);
        if (modeloMatch) {
            cleanName = `Modelo ${modeloMatch[1]}`;
        }
        if (!cleanName || cleanName.toLowerCase() === 'png' || cleanName.toLowerCase() === 'jpg') {
            cleanName = 'Creador';
        }

        // Title Case capitalization (e.g. "pima" -> "Pima", "modelo 1" -> "Modelo 1")
        cleanName = cleanName.split(' ')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(' ');

        const photoVal = c.photo || c.pngPhoto || c.png_photo || '';
        let pngVal = c.pngPhoto || c.png_photo || '';

        // Auto-resolve high quality transparent cutout
        const nameKey = cleanName.toLowerCase().trim();
        if (!pngVal || (!pngVal.includes('cutout') && !pngVal.startsWith('data:image/png'))) {
            if (KNOWN_CUTOUTS[nameKey]) {
                pngVal = KNOWN_CUTOUTS[nameKey];
            } else {
                for (const [k, path] of Object.entries(KNOWN_CUTOUTS)) {
                    if (nameKey.includes(k) || k.includes(nameKey)) {
                        pngVal = path;
                        break;
                    }
                }
            }
        }
        if (!pngVal) {
            const cid = (c.id || '').toLowerCase();
            if (cid.includes('-0-') || cid.includes('pima')) pngVal = 'cutouts/pima.png';
            else if (cid.includes('-1-')) pngVal = 'cutouts/modelo_1.png';
            else if (cid.includes('-2-')) pngVal = 'cutouts/modelo_2.png';
            else if (cid.includes('-3-')) pngVal = 'cutouts/modelo_4.png';
            else if (cid.includes('-4-')) pngVal = 'cutouts/modelo_5.png';
            else if (cid.includes('-5-')) pngVal = 'cutouts/modelo_6.png';
        }
        if (!pngVal) {
            pngVal = photoVal;
        }

        return {
            id: c.id,
            name: cleanName,
            photo: photoVal,
            pngPhoto: pngVal,
            boxSettings: {
                scale: typeof rawSettings.scale === 'number' ? rawSettings.scale : 1.05,
                x: typeof rawSettings.x === 'number' ? rawSettings.x : 0,
                y: typeof rawSettings.y === 'number' ? rawSettings.y : 0,
                nameSize: typeof rawSettings.nameSize === 'number' ? rawSettings.nameSize : 3.0,
                nameY: typeof rawSettings.nameY === 'number' ? rawSettings.nameY : 22,
                stroke: typeof rawSettings.stroke === 'number' ? rawSettings.stroke : 4.0
            },
            color: c.color || '#E63946',
            inBoxes: c.inBoxes !== false,
            category: c.category || 'Lifestyle & Trends',
            bio: c.bio || 'Creador exclusivo de SHAKERSSS Agency. Especialista en campañas de alto impacto y contenido viral.',
            instagram: c.instagram || (cleanName ? cleanName.toLowerCase().replace(/[^a-z0-9]/g, '') : ''),
            tiktok: c.tiktok || (cleanName ? cleanName.toLowerCase().replace(/[^a-z0-9]/g, '_') : ''),
            youtube: c.youtube || (cleanName ? `${cleanName}Official` : ''),
            metrics: c.metrics || '+500K Seguidores · 9.8% Engagement · España'
        };
    }

    // --- Cyclical Expansion to 50 Slots for the Public Web ---
    expandTo50Slots(creators) {
        if (!creators || !Array.isArray(creators) || creators.length === 0) {
            return [];
        }
        if (creators.length >= 50) {
            return creators.slice(0, 50);
        }
        // Repeat creators cyclically (round-robin) until 50 slots are completely filled
        const slots = [];
        for (let i = 0; i < 50; i++) {
            const original = creators[i % creators.length];
            slots.push({
                ...original,
                _slotIndex: i,
                _isDuplicate: i >= creators.length
            });
        }
        return slots;
    }

    async getCreators() {
        let localList = null;

        // 1. Try IndexedDB first (most complete and up-to-date offline store)
        try {
            const idbData = await idbGet(this.STORAGE_KEY_CREATORS);
            if (idbData && Array.isArray(idbData)) {
                localList = idbData;
            }
        } catch (e) {}

        // 2. Try LocalStorage if no IndexedDB data
        if (localList === null) {
            try {
                const local = localStorage.getItem(this.STORAGE_KEY_CREATORS);
                if (local !== null) {
                    localList = JSON.parse(local);
                }
            } catch (e) {}
        }

        // 3. Fallback to default (initially empty)
        if (localList === null || !Array.isArray(localList)) {
            localList = JSON.parse(JSON.stringify(DEFAULT_CREATORS));
        }

        // 4. Try Supabase and MERGE
        if (this.supabaseClient) {
            try {
                const { data, error } = await this.supabaseClient
                    .from('creators')
                    .select('*')
                    .order('created_at', { ascending: true });
                if (!error && data) {
                    if (data.length > 0) {
                        const localMap = new Map((localList || []).map(c => [c.id, c]));
                        const mergedList = data.map(sb => {
                            const loc = localMap.get(sb.id) || {};
                            return {
                                ...loc,
                                ...sb,
                                pngPhoto: sb.pngPhoto || sb.png_photo || loc.pngPhoto || '',
                                boxSettings: sb.boxSettings || sb.box_settings || loc.boxSettings,
                                category: sb.category || loc.category,
                                bio: sb.bio || loc.bio,
                                metrics: sb.metrics || loc.metrics,
                                instagram: sb.instagram || loc.instagram,
                                tiktok: sb.tiktok || loc.tiktok,
                                youtube: sb.youtube || loc.youtube
                            };
                        });

                        localList = mergedList;
                        await idbSet(this.STORAGE_KEY_CREATORS, localList);
                    } else if (data.length === 0) {
                        // Supabase was explicitly cleared
                        localList = [];
                        await idbSet(this.STORAGE_KEY_CREATORS, []);
                        try {
                            localStorage.setItem(this.STORAGE_KEY_CREATORS, JSON.stringify([]));
                        } catch (e) {}
                    }
                }
            } catch (err) {
                console.warn('[ShakersssData] Supabase fetch error, fallback to local/IndexedDB:', err);
            }
        }

        return (localList || []).map(c => this._normalizeCreator(c));
    }

    async saveCreators(creatorsList) {
        const normalized = creatorsList.map(c => this._normalizeCreator(c));

        // 1. Always save to IndexedDB first (virtually unlimited quota, offline-safe)
        await idbSet(this.STORAGE_KEY_CREATORS, normalized);

        // 2. Try saving to LocalStorage with safe try/catch
        try {
            localStorage.setItem(this.STORAGE_KEY_CREATORS, JSON.stringify(normalized));
        } catch (quotaErr) {
            console.warn('[ShakersssData] LocalStorage Quota Exceeded. Saved safely to IndexedDB:', quotaErr);
        }

        // 3. Sync with Supabase if active (upsert core columns directly to avoid column mismatch errors)
        if (this.supabaseClient) {
            try {
                if (normalized.length === 0) {
                    // Empty list in Supabase
                    await this.supabaseClient.from('creators').delete().neq('id', '');
                } else {
                    const currentIds = normalized.map(c => c.id);
                    // Sync deletions in Supabase: remove any row whose id is no longer in normalized
                    try {
                        const { data: existingRows } = await this.supabaseClient.from('creators').select('id');
                        if (existingRows && existingRows.length > 0) {
                            const toRemove = existingRows.filter(r => !currentIds.includes(r.id)).map(r => r.id);
                            if (toRemove.length > 0) {
                                await this.supabaseClient.from('creators').delete().in('id', toRemove);
                            }
                        }
                    } catch (delErr) {}

                    const coreList = normalized.map(c => ({
                        id: c.id,
                        name: c.name,
                        photo: c.photo,
                        color: c.color,
                        inBoxes: c.inBoxes
                    }));
                    const { error: coreErr } = await this.supabaseClient.from('creators').upsert(coreList);
                    if (coreErr) {
                        console.warn('[ShakersssData] Supabase core upsert notice:', coreErr);
                    }
                }
            } catch (err) {
                console.warn('[ShakersssData] Supabase upsert notice (continuando en local):', err);
            }
        }

        window.dispatchEvent(new CustomEvent('shakersss:creators-updated', { detail: normalized }));
        return true;
    }

    async updateCreator(creatorId, updatedFields) {
        const list = await this.getCreators();
        const index = list.findIndex(c => c.id === creatorId);
        if (index !== -1) {
            list[index] = { ...list[index], ...updatedFields };
            await this.saveCreators(list);
            return list[index];
        }
        return null;
    }

    // --- Success Cases Management ---
    async getSuccessCases() {
        // 1. Try IndexedDB
        try {
            const idbCases = await idbGet(this.STORAGE_KEY_CASES);
            if (idbCases && Array.isArray(idbCases) && idbCases.length > 0) {
                return idbCases;
            }
        } catch (e) {}

        // 2. Try Supabase
        if (this.supabaseClient) {
            try {
                const { data, error } = await this.supabaseClient
                    .from('success_cases')
                    .select('*')
                    .order('created_at', { ascending: true });
                if (!error && data && data.length > 0) {
                    await idbSet(this.STORAGE_KEY_CASES, data);
                    return data;
                }
            } catch (err) {
                console.warn('[ShakersssData] Supabase fetch cases error, fallback to local:', err);
            }
        }

        // 3. Try LocalStorage
        try {
            const local = localStorage.getItem(this.STORAGE_KEY_CASES);
            if (local) {
                return JSON.parse(local);
            }
        } catch (e) {}

        // 4. Default
        return JSON.parse(JSON.stringify(DEFAULT_CASES));
    }

    async saveSuccessCases(casesList) {
        // Save to IndexedDB
        await idbSet(this.STORAGE_KEY_CASES, casesList);

        // Safe LocalStorage
        try {
            localStorage.setItem(this.STORAGE_KEY_CASES, JSON.stringify(casesList));
        } catch (e) {
            console.warn('[ShakersssData] LocalStorage save cases quota error:', e);
        }

        if (this.supabaseClient) {
            try {
                const { error } = await this.supabaseClient.from('success_cases').upsert(casesList);
                if (error) {
                    console.error('[ShakersssData] Supabase upsert cases error:', error);
                }
            } catch (err) {
                console.error('[ShakersssData] Supabase upsert cases error:', err);
            }
        }

        window.dispatchEvent(new CustomEvent('shakersss:cases-updated', { detail: casesList }));
        return true;
    }

    async updateSuccessCase(caseId, updatedFields) {
        const list = await this.getSuccessCases();
        const index = list.findIndex(c => c.id === caseId);
        if (index !== -1) {
            list[index] = { ...list[index], ...updatedFields };
            await this.saveSuccessCases(list);
            return list[index];
        }
        return null;
    }

    // --- Reset to Factory Defaults ---
    async resetToDefaults() {
        localStorage.removeItem(this.STORAGE_KEY_CREATORS);
        localStorage.removeItem(this.STORAGE_KEY_CASES);
        await idbDelete(this.STORAGE_KEY_CREATORS);
        await idbDelete(this.STORAGE_KEY_CASES);
        if (this.supabaseClient) {
            try {
                await this.supabaseClient.from('creators').delete().neq('id', '');
            } catch (e) {}
        }
        return {
            creators: [],
            cases: JSON.parse(JSON.stringify(DEFAULT_CASES))
        };
    }

    // --- Automatic Page Hydration (Home & Roster) ---
    async hydrateHomePage() {
        const rosterContainer = document.getElementById('roster');
        const casesContainer = document.getElementById('cases-track');
        if (!rosterContainer && !casesContainer) return;

        // 1. Hydrate Cereal Boxes in Home
        if (rosterContainer) {
            const creators = await this.getCreators();
            const boxCreators = creators.filter(c => c.inBoxes !== false);
            const boxElements = rosterContainer.querySelectorAll('.cereal-box');

            if (boxCreators.length > 0) {
                boxElements.forEach((boxEl, idx) => {
                    // Repeat cyclically across the 20 cereal boxes if fewer than 20
                    const c = boxCreators[idx % boxCreators.length];
                    if (c) {
                        // If pre-rendered texture exists from the editor, use it directly
                        if (c.boxTexture) {
                            const boxFront = boxEl.querySelector('.box-front');
                            if (boxFront) {
                                boxFront.style.backgroundImage = `url(${c.boxTexture})`;
                                boxFront.style.backgroundSize = 'cover';
                                boxFront.style.backgroundPosition = 'center';
                                boxFront.style.backgroundBlendMode = 'normal';
                                // Hide all child layers — texture IS the final result
                                boxFront.querySelectorAll('.box-front-name-layer, .box-front-cutout-wrap, .box-front-badge, .box-front-overlay').forEach(el => {
                                    el.style.display = 'none';
                                });
                                // Still update spine
                                const spineNameEl = boxEl.querySelector('.spine-name');
                                if (spineNameEl) spineNameEl.textContent = c.name;
                            }
                        } else {
                            // Fallback: CSS-composed rendering
                            boxEl.style.setProperty('--box-color', c.color || '#E63946');
                            const s = c.boxSettings || { scale: 1.05, x: 0, y: 0, nameSize: 3.0, nameY: 22, stroke: 4.0 };
                            boxEl.style.setProperty('--box-cutout-scale', s.scale);
                            boxEl.style.setProperty('--box-cutout-x', `${s.x}px`);
                            boxEl.style.setProperty('--box-cutout-y', `${s.y}px`);
                            const isSingleLine = c.name.trim().split(/\s+/).length === 1 || (c.name.trim().split(/\s+/).length === 2 && (c.name.trim().split(/\s+/)[1].length <= 2 || c.name.length <= 9));
                            const defaultNameTop = isSingleLine ? 18 : 22;
                            const defaultNameSize = isSingleLine ? 2.8 : 3.0;

                            boxEl.style.setProperty('--box-name-size', `${s.nameSize || defaultNameSize}rem`);
                            boxEl.style.setProperty('--box-name-top', `${s.nameY || defaultNameTop}%`);
                            boxEl.style.setProperty('--box-name-stroke', `${s.stroke || 4.0}px`);

                            // Smart name formatting matching reference mockup
                            const nameEl = boxEl.querySelector('.box-front-creator-name') || boxEl.querySelector('.box-name');
                            if (nameEl) {
                                const words = c.name.trim().split(/\s+/);
                                if (words.length === 2 && words[1].length > 2 && c.name.length > 9) {
                                    nameEl.textContent = `${words[0]}\n${words[1]}`;
                                } else if (words.length === 3 && words[0].length + words[1].length < 12) {
                                    nameEl.textContent = `${words[0]} ${words[1]}\n${words[2]}`;
                                } else {
                                    nameEl.textContent = c.name;
                                }
                            }

                            const spineNameEl = boxEl.querySelector('.spine-name');
                            if (spineNameEl) spineNameEl.textContent = c.name;

                            // Left badge: Specialty / Category
                            const badgeCategory = boxEl.querySelector('.box-front-badge-left .badge-val');
                            if (badgeCategory) {
                                let cat = c.category || 'Lifestyle & Trends';
                                if (cat.length > 20) {
                                    cat = cat.split('&')[0].trim();
                                }
                                badgeCategory.textContent = cat;
                            }
                            
                            // Right badge: Clean follower metric (avoid duplicate "seguidores")
                            const badgeMetrics = boxEl.querySelector('.box-front-badge-right .badge-val');
                            if (badgeMetrics) {
                                const raw = c.metrics || '+500K';
                                let firstMetric = raw.split('·')[0].trim();
                                firstMetric = firstMetric.replace(/\s*(seguidores|followers)\b/gi, '').trim();
                                badgeMetrics.textContent = firstMetric || '+500K';
                            }

                            // Transparent PNG Cutout with Duotone Multiply
                            const cutoutImg = boxEl.querySelector('.box-front-cutout-img');
                            if (cutoutImg) {
                                const cutoutSrc = c.pngPhoto || c.photo;
                                cutoutImg.src = cutoutSrc;
                                const isFallback = !c.pngPhoto || (c.pngPhoto === c.photo && !c.pngPhoto.includes('cutout') && !c.pngPhoto.startsWith('data:image/png'));
                                if (isFallback) {
                                    cutoutImg.classList.add('is-fallback-photo');
                                } else {
                                    cutoutImg.classList.remove('is-fallback-photo');
                                }
                                cutoutImg.alt = c.name;
                            }
                        }
                    }
                });
            } else {
                // If 0 creators exist in database, display clean SHAKERSSS placeholder on boxes
                boxElements.forEach((boxEl) => {
                    boxEl.style.setProperty('--box-color', '#E63946');
                    const nameEl = boxEl.querySelector('.box-front-creator-name') || boxEl.querySelector('.box-name');
                    if (nameEl) nameEl.textContent = 'SHAKERSSS';
                    const spineNameEl = boxEl.querySelector('.spine-name');
                    if (spineNameEl) spineNameEl.textContent = 'SHAKERSSS';
                    const cutoutImg = boxEl.querySelector('.box-front-cutout-img');
                    if (cutoutImg) {
                        cutoutImg.src = 'shakersss_logo.png';
                        cutoutImg.classList.add('is-fallback-photo');
                    }
                });
            }
        }

        // 2. Hydrate Success Cases in Home
        if (casesContainer) {
            const cases = await this.getSuccessCases();
            const caseElements = casesContainer.querySelectorAll('.bowl-case-item');

            caseElements.forEach((caseEl, idx) => {
                const cs = cases[idx];
                if (cs) {
                    const photoImg = caseEl.querySelector('.bowl-photo');
                    if (photoImg) {
                        photoImg.src = cs.photo;
                        photoImg.alt = cs.title;
                    }
                    const bowlImg = caseEl.querySelector('.bowl-img');
                    if (bowlImg) {
                        bowlImg.src = cs.bowl;
                    }
                    const brandEl = caseEl.querySelector('.case-brand');
                    if (brandEl) brandEl.textContent = cs.brand;
                    const titleEl = caseEl.querySelector('.case-title');
                    if (titleEl) titleEl.textContent = cs.title;
                    const metaEl = caseEl.querySelector('.case-meta');
                    if (metaEl) metaEl.textContent = cs.meta;
                }
            });
        }
    }

    async hydrateRosterPage() {
        const grid = document.getElementById('roster-grid') || document.querySelector('.roster-grid') || document.querySelector('.creators-grid');
        if (!grid) return;

        const realCreators = await this.getCreators();

        // If no real creators exist in database, display a clean empty state
        if (realCreators.length === 0) {
            grid.innerHTML = `
                <div class="roster-empty-state" style="grid-column: 1 / -1; text-align: center; padding: 80px 20px; color: var(--color-topo);">
                    <h3 style="font-family: 'Antonio', sans-serif; font-size: 2.4rem; letter-spacing: 0.05em; margin-bottom: 12px; color: var(--brand-mint);">CATÁLOGO EN PREPARACIÓN</h3>
                    <p style="font-family: 'Plus Jakarta Sans', sans-serif; opacity: 0.85; font-size: 1.1rem; max-width: 520px; margin: 0 auto;">Estamos preparando el nuevo roster de creadores de SHAKERSSS. Visita el panel de administración para subir los perfiles.</p>
                </div>
            `;
            return;
        }

        // Requirement 4: Web ALWAYS expands to exactly 50 slots by cycling real creators
        const displayCreators = this.expandTo50Slots(realCreators);
        let cards = grid.querySelectorAll('.creator-card');

        // If grid doesn't have 50 cards, build them
        if (cards.length < 50) {
            grid.innerHTML = '';
            for (let i = 0; i < 50; i++) {
                const cardEl = document.createElement('a');
                cardEl.href = '#';
                cardEl.className = 'creator-card';
                cardEl.innerHTML = `
                    <img src="" alt="" class="creator-card-img" loading="lazy" decoding="async">
                    <div class="card-inner">
                        <span class="card-name"></span>
                    </div>
                `;
                grid.appendChild(cardEl);
            }
            cards = grid.querySelectorAll('.creator-card');
        }

        // Populate all 50 slots
        displayCreators.slice(0, 50).forEach((c, idx) => {
            const cardEl = cards[idx];
            if (!cardEl) return;
            cardEl.style.display = '';
            cardEl.style.opacity = '1';
            cardEl.dataset.creator = c.id;
            cardEl.id = `card-${c.id}-slot-${idx}`;
            const img = cardEl.querySelector('.creator-card-img');
            if (img) {
                img.src = c.photo || c.pngPhoto || '';
                img.alt = c.name;
            }
            const nameEl = cardEl.querySelector('.card-name');
            if (nameEl) nameEl.textContent = c.name;
        });

        // Hide any excess cards beyond 50
        for (let i = 50; i < cards.length; i++) {
            cards[i].style.display = 'none';
        }

        window.dispatchEvent(new CustomEvent('shakersss:roster-hydrated'));
    }
}

// Global instance
window.shakersssData = new ShakersssDataService();

// Auto-run hydration on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.shakersssData.hydrateHomePage();
        window.shakersssData.hydrateRosterPage();
    });
} else {
    window.shakersssData.hydrateHomePage();
    window.shakersssData.hydrateRosterPage();
}

// Live update listener across tabs / storage events
window.addEventListener('storage', (e) => {
    if (e.key === 'shakersss_creators_v5' || e.key === 'shakersss_cases_v1') {
        window.shakersssData.hydrateHomePage();
        window.shakersssData.hydrateRosterPage();
    }
});
window.addEventListener('shakersss:creators-updated', () => {
    window.shakersssData.hydrateHomePage();
    window.shakersssData.hydrateRosterPage();
});
window.addEventListener('shakersss:cases-updated', () => {
    window.shakersssData.hydrateHomePage();
});

