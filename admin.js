/**
 * SHAKERSSS — CMS Admin Panel Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    const AUTH_KEY = 'shakersss_admin_authenticated';
    const DEFAULT_PIN = 'shakersss2026';

    // --- DOM Elements ---
    const lockScreen = document.getElementById('lock-screen');
    const lockForm = document.getElementById('lock-form');
    const adminPinInput = document.getElementById('admin-pin');
    const lockError = document.getElementById('lock-error');
    const adminApp = document.getElementById('admin-app');
    const btnLogout = document.getElementById('btn-logout');

    // Tabs
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Creators
    const creatorsGrid = document.getElementById('creators-grid');
    const searchCreators = document.getElementById('search-creators');
    const btnAddCreator = document.getElementById('btn-add-creator');
    const btnMassUploadOpen = document.getElementById('btn-mass-upload-open');
    const btnClearAllCreators = document.getElementById('btn-clear-all-creators');
    const creatorsCount = document.getElementById('creators-count');

    // Mass Upload Modal Elements
    const massUploadModal = document.getElementById('mass-upload-modal');
    const massModalOverlay = document.getElementById('mass-modal-overlay');
    const massModalClose = document.getElementById('mass-modal-close');
    const btnMassCancel = document.getElementById('btn-mass-cancel');
    const massDropzone = document.getElementById('mass-dropzone');
    const massFilesInput = document.getElementById('mass-files-input');
    const btnMassBrowse = document.getElementById('btn-mass-browse');
    const massDefaultCategory = document.getElementById('mass-default-category');
    const massDefaultMetrics = document.getElementById('mass-default-metrics');
    const massDefaultInBoxes = document.getElementById('mass-default-inboxes');
    const massProgressWrap = document.getElementById('mass-progress-wrap');
    const massProgressTitle = document.getElementById('mass-progress-title');
    const massProgressCount = document.getElementById('mass-progress-count');
    const massBarFill = document.getElementById('mass-bar-fill');
    const massProgressHint = document.getElementById('mass-progress-hint');
    const massQueueCard = document.getElementById('mass-queue-card');
    const massQueueNum = document.getElementById('mass-queue-num');
    const btnMassClear = document.getElementById('btn-mass-clear');
    const massQueueList = document.getElementById('mass-queue-list');
    const btnMassExecute = document.getElementById('btn-mass-execute');
    const btnMassExecuteText = document.getElementById('btn-mass-execute-text');

    // Creator Modal
    const creatorModal = document.getElementById('creator-modal');
    const creatorModalClose = document.getElementById('creator-modal-close');
    const creatorModalOverlay = document.getElementById('creator-modal-overlay');
    const btnCancelCreator = document.getElementById('btn-cancel-creator');
    const creatorEditForm = document.getElementById('creator-edit-form');
    const creatorModalTitle = document.getElementById('creator-modal-title');
    const creatorEditId = document.getElementById('creator-edit-id');
    const creatorName = document.getElementById('creator-name');
    const creatorPhoto = document.getElementById('creator-photo');
    const creatorColor = document.getElementById('creator-color');
    const creatorColorText = document.getElementById('creator-color-text');
    const creatorInBoxes = document.getElementById('creator-in-boxes');
    const creatorCategory = document.getElementById('creator-category');
    const creatorMetrics = document.getElementById('creator-metrics');
    const creatorBio = document.getElementById('creator-bio');
    const creatorInstagram = document.getElementById('creator-instagram');
    const creatorTiktok = document.getElementById('creator-tiktok');
    const creatorYoutube = document.getElementById('creator-youtube');
    const creatorPreviewImg = document.getElementById('creator-preview-img');
    const creatorPreviewBox = document.getElementById('creator-preview-box');
    const creatorPreviewBoxName = document.getElementById('creator-preview-box-name');
    const creatorPreviewCategory = document.getElementById('creator-preview-category');
    const btnDeleteCreator = document.getElementById('btn-delete-creator');
    const btnSaveCreator = document.getElementById('btn-save-creator');

    // Creator Image 1: Profile Photo (With Background)
    const creatorTabFileBtn = document.getElementById('creator-tab-file-btn');
    const creatorTabUrlBtn = document.getElementById('creator-tab-url-btn');
    const creatorPaneFile = document.getElementById('creator-pane-file');
    const creatorPaneUrl = document.getElementById('creator-pane-url');
    const creatorDropzone = document.getElementById('creator-dropzone');
    const creatorFileInput = document.getElementById('creator-file-input');
    const creatorUploadStatus = document.getElementById('creator-upload-status');
    const btnAutoCutout = document.getElementById('btn-auto-cutout');
    const creatorCutoutStatus = document.getElementById('creator-cutout-status');

    // Creator Image 2: PNG Cutout (Transparent Silhouette)
    const creatorPngPhoto = document.getElementById('creator-png-photo');
    const creatorPngTabFileBtn = document.getElementById('creator-png-tab-file-btn');
    const creatorPngTabUrlBtn = document.getElementById('creator-png-tab-url-btn');
    const creatorPngPaneFile = document.getElementById('creator-png-pane-file');
    const creatorPngPaneUrl = document.getElementById('creator-png-pane-url');
    const creatorPngDropzone = document.getElementById('creator-png-dropzone');
    const creatorPngFileInput = document.getElementById('creator-png-file-input');
    const creatorPngUploadStatus = document.getElementById('creator-png-upload-status');
    const creatorPreviewPng = document.getElementById('creator-preview-png');
    const pngEmptyHint = document.getElementById('png-empty-hint');

    // Cereal Box Studio & Live Viewer
    const studioBoxFront = document.getElementById('studio-box-front');
    const studioNameLayer = document.getElementById('studio-name-layer');
    const studioCreatorName = document.getElementById('studio-creator-name');
    const studioCutoutWrap = document.getElementById('studio-cutout-wrap');
    const studioCutoutImg = document.getElementById('studio-cutout-img');
    const btnStudioReset = document.getElementById('btn-studio-reset');
    const sliderStudioScale = document.getElementById('slider-studio-scale');
    const sliderStudioY = document.getElementById('slider-studio-y');
    const sliderStudioX = document.getElementById('slider-studio-x');
    const sliderStudioNameSize = document.getElementById('slider-studio-name-size');
    const sliderStudioNameY = document.getElementById('slider-studio-name-y');
    const sliderStudioStroke = document.getElementById('slider-studio-stroke');
    const toggleNameOneline = document.getElementById('toggle-name-oneline');
    const valStudioScale = document.getElementById('val-studio-scale');
    const valStudioY = document.getElementById('val-studio-y');
    const valStudioX = document.getElementById('val-studio-x');
    const valStudioNameSize = document.getElementById('val-studio-name-size');
    const valStudioNameY = document.getElementById('val-studio-name-y');
    const valStudioStroke = document.getElementById('val-studio-stroke');

    // Cases
    const casesGrid = document.getElementById('cases-grid');
    const btnAddCase = document.getElementById('btn-add-case');
    const casesCount = document.getElementById('cases-count');

    // Case Modal
    const caseModal = document.getElementById('case-modal');
    const caseModalClose = document.getElementById('case-modal-close');
    const caseModalOverlay = document.getElementById('case-modal-overlay');
    const btnCancelCase = document.getElementById('btn-cancel-case');
    const caseEditForm = document.getElementById('case-edit-form');
    const caseModalTitle = document.getElementById('case-modal-title');
    const caseEditId = document.getElementById('case-edit-id');
    const caseBrand = document.getElementById('case-brand');
    const caseTitle = document.getElementById('case-title');
    const caseMeta = document.getElementById('case-meta');
    const casePhoto = document.getElementById('case-photo');
    const btnDeleteCase = document.getElementById('btn-delete-case');
    const btnSaveCase = document.getElementById('btn-save-case');

    // Case Image Upload Tabs & Dropzone
    const caseTabFileBtn = document.getElementById('case-tab-file-btn');
    const caseTabUrlBtn = document.getElementById('case-tab-url-btn');
    const casePaneFile = document.getElementById('case-pane-file');
    const casePaneUrl = document.getElementById('case-pane-url');
    const caseDropzone = document.getElementById('case-dropzone');
    const caseFileInput = document.getElementById('case-file-input');
    const caseUploadStatus = document.getElementById('case-upload-status');

    // Supabase & Tools
    const supabaseForm = document.getElementById('supabase-config-form');
    const supabaseUrlInput = document.getElementById('supabase-url');
    const supabaseKeyInput = document.getElementById('supabase-key');
    const btnDisconnectSupabase = document.getElementById('btn-disconnect-supabase');
    const btnCopySql = document.getElementById('btn-copy-sql');
    const sqlCode = document.getElementById('sql-code');
    const btnExportJson = document.getElementById('btn-export-json');
    const importJsonFile = document.getElementById('import-json-file');
    const btnResetDefaults = document.getElementById('btn-reset-defaults');
    const dbStatusPill = document.getElementById('db-status-pill');
    const statusText = document.getElementById('status-text');

    // Toast
    const toast = document.getElementById('admin-toast');
    const toastMsg = document.getElementById('toast-msg');

    let currentCreators = [];
    let currentCases = [];

    // ==========================================
    // 1. PIN AUTHENTICATION
    // ==========================================
    function checkAuth() {
        if (sessionStorage.getItem(AUTH_KEY) === 'true') {
            lockScreen.style.display = 'none';
            adminApp.style.display = 'flex';
            initDashboard();
        } else {
            lockScreen.style.display = 'flex';
            adminApp.style.display = 'none';
            adminPinInput.focus();
        }
    }

    lockForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pin = adminPinInput.value.trim();
        if (pin === DEFAULT_PIN) {
            sessionStorage.setItem(AUTH_KEY, 'true');
            lockError.style.display = 'none';
            checkAuth();
            showToast('¡Bienvenido al panel de administración de SHAKERSSS!');
        } else {
            lockError.style.display = 'block';
            adminPinInput.select();
        }
    });

    btnLogout.addEventListener('click', () => {
        sessionStorage.removeItem(AUTH_KEY);
        checkAuth();
    });

    // ==========================================
    // 2. DASHBOARD INITIALIZATION
    // ==========================================
    async function initDashboard() {
        updateDbStatus();
        await loadCreators();
        await loadCases();
        loadSupabaseConfigInputs();
    }

    function updateDbStatus() {
        if (window.shakersssData.isSupabaseConnected()) {
            dbStatusPill.classList.add('is-cloud');
            statusText.textContent = 'Conectado a Supabase (Nube)';
        } else {
            dbStatusPill.classList.remove('is-cloud');
            statusText.textContent = 'Almacenamiento Local (Listo)';
        }
    }

    function showToast(msg) {
        toastMsg.textContent = msg;
        toast.classList.add('is-visible');
        setTimeout(() => {
            toast.classList.remove('is-visible');
        }, 3200);
    }

    // ==========================================
    // 3. TABS NAVIGATION
    // ==========================================
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.tab;
            navTabs.forEach(t => t.classList.remove('is-active'));
            tabPanes.forEach(p => p.classList.remove('is-active'));

            tab.classList.add('is-active');
            const targetPane = document.getElementById(targetId);
            if (targetPane) targetPane.classList.add('is-active');
        });
    });

    // ==========================================
    // IMAGE UPLOAD HELPER (DROPZONE + STORAGE)
    // ==========================================
    function setupImageUpload(tabFileBtn, tabUrlBtn, paneFile, paneUrl, dropzone, fileInput, statusPill, urlInput, previewCallback, folder) {
        if (!tabFileBtn || !tabUrlBtn || !dropzone || !fileInput) return;

        tabFileBtn.addEventListener('click', () => {
            tabFileBtn.classList.add('is-active');
            tabUrlBtn.classList.remove('is-active');
            paneFile.style.display = 'block';
            paneUrl.style.display = 'none';
        });

        tabUrlBtn.addEventListener('click', () => {
            tabUrlBtn.classList.add('is-active');
            tabFileBtn.classList.remove('is-active');
            paneUrl.style.display = 'block';
            paneFile.style.display = 'none';
        });

        dropzone.addEventListener('click', () => {
            fileInput.click();
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropzone.classList.add('is-dragover');
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropzone.classList.remove('is-dragover');
            });
        });

        dropzone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            if (files && files.length > 0) {
                handleFile(files[0]);
            }
        });

        fileInput.addEventListener('change', (e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
                handleFile(files[0]);
            }
        });

        async function handleFile(file) {
            if (!file.type.startsWith('image/')) {
                alert('Por favor selecciona un archivo de imagen válido (JPG, PNG, WEBP).');
                return;
            }

            statusPill.style.display = 'inline-block';
            statusPill.classList.remove('is-error');
            statusPill.textContent = 'Subiendo imagen...';

            try {
                const result = await window.shakersssData.uploadImage(file, folder);
                urlInput.value = result.url;
                previewCallback(result.url);
                statusPill.textContent = result.source === 'supabase' ? '✓ Subida a Supabase Storage' : '✓ Cargada localmente (Base64)';
                showToast(result.source === 'supabase' ? 'Imagen guardada en Supabase Storage' : 'Imagen guardada localmente');
            } catch (err) {
                statusPill.classList.add('is-error');
                statusPill.textContent = 'Error al subir imagen';
                console.error('File upload error:', err);
            }
        }
    }

    // Initialize dropzones
    setupImageUpload(
        creatorTabFileBtn, creatorTabUrlBtn,
        creatorPaneFile, creatorPaneUrl,
        creatorDropzone, creatorFileInput, creatorUploadStatus,
        creatorPhoto, () => updateCreatorPreview(), 'creators'
    );

    setupImageUpload(
        creatorPngTabFileBtn, creatorPngTabUrlBtn,
        creatorPngPaneFile, creatorPngPaneUrl,
        creatorPngDropzone, creatorPngFileInput, creatorPngUploadStatus,
        creatorPngPhoto, () => updateCreatorPreview(), 'creators_png'
    );

    setupImageUpload(
        caseTabFileBtn, caseTabUrlBtn,
        casePaneFile, casePaneUrl,
        caseDropzone, caseFileInput, caseUploadStatus,
        casePhoto, () => {}, 'cases'
    );

    // ==========================================
    // AUTO-CUTOUT BACKGROUND REMOVAL (AI)
    // ==========================================
    let bgRemovalFn = null;

    async function removeImageBackground(imageSrc, timeoutMs = 15000) {
        if (!bgRemovalFn) {
            const module = await import('https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.5.8/+esm');
            bgRemovalFn = module.removeBackground;
        }

        const task = bgRemovalFn(imageSrc);
        const timer = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Background removal timeout (15s)')), timeoutMs)
        );

        return await Promise.race([task, timer]);
    }

    if (btnAutoCutout) {
        btnAutoCutout.addEventListener('click', async () => {
            const photoSrc = creatorPhoto.value.trim();
            if (!photoSrc) {
                alert('Por favor sube o introduce primero una foto de perfil en el Hueco 1.');
                return;
            }

            btnAutoCutout.disabled = true;
            creatorCutoutStatus.style.display = 'inline-block';
            creatorCutoutStatus.className = 'auto-cutout-status is-loading';
            creatorCutoutStatus.textContent = '🪄 Procesando recorte con IA... (puede tardar unos segundos)';

            try {
                const blob = await removeImageBackground(photoSrc);
                const cleanName = (creatorName.value || 'creator').toLowerCase().replace(/[^a-z0-9]/g, '_');
                const cutoutFile = new File([blob], `${cleanName}_cutout_${Date.now()}.png`, { type: 'image/png' });

                creatorCutoutStatus.textContent = 'Subiendo PNG recortado...';
                const uploadResult = await window.shakersssData.uploadImage(cutoutFile, 'creators_png');

                creatorPngPhoto.value = uploadResult.url;
                updateCreatorPreview();

                creatorCutoutStatus.className = 'auto-cutout-status';
                creatorCutoutStatus.textContent = '✓ Sujeto recortado y asignado al Hueco 2';
                showToast('¡Recorte PNG generado y asignado al Hueco 2 con éxito!');
            } catch (err) {
                console.error('[AutoCutout Error]', err);
                creatorCutoutStatus.className = 'auto-cutout-status is-error';
                creatorCutoutStatus.textContent = 'No se pudo recortar automáticamente. Sube tu PNG manualmente en el Hueco 2.';
            } finally {
                btnAutoCutout.disabled = false;
            }
        });
    }

    // Curated vibrant color palette for auto-assignment in mass upload
    const VIBRANT_BOX_PALETTE = [
        '#E63946', '#2A9D8F', '#D4A03C', '#264653', '#F4A261',
        '#7B2D8B', '#1D3557', '#2D6A4F', '#E76F51', '#457B9D',
        '#9B5DE5', '#F15BB5', '#00BBF9', '#00F5D4', '#FEE440',
        '#FB5607', '#8338EC', '#3A86FF', '#D64045', '#1B998B'
    ];

    function formatCleanName(filename, indexFallback) {
        if (!filename) return `Creador ${indexFallback || ''}`.trim() || 'Creador';
        // 1. Remove file extension
        let name = filename.replace(/\.[^/.]+$/, '');
        // 2. Remove file extension mentions inside filename like .png or _png or (1).png
        name = name.replace(/[-_.](png|jpg|jpeg|webp)\b/gi, ' ');
        name = name.replace(/\b(png|jpg|jpeg|webp)\b/gi, ' ');
        // 3. Remove long camera/export timestamps like 20260927103022 or 1790429304642
        name = name.replace(/\b20\d{8,}\b/g, ' ');
        name = name.replace(/\b17\d{10,}\b/g, ' ');
        // 4. Replace separators with spaces
        name = name.replace(/[-_.]+/g, ' ').trim();

        // 5. Check if there are meaningful words
        const words = name.split(/\s+/).filter(w => w.length > 0);
        const meaningfulWords = words.filter(w => !/^(img|dsc|photo|foto|cutout|pic|picture|avatar|image|recorte|portada|shake|shakersss|asset|media)$/i.test(w));

        if (meaningfulWords.length > 0) {
            let result = meaningfulWords
                .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                .join(' ');
            if (/^\d+$/.test(result)) {
                return `Creador ${result}`;
            }
            return result;
        }

        const numberMatch = filename.match(/\d+/);
        if (numberMatch && numberMatch[0].length < 6) {
            return `Creador ${numberMatch[0]}`;
        }

        return `Creador ${indexFallback || ''}`.trim() || 'Creador';
    }

    // ==========================================
    // 4. CREATORS SECTION
    // ==========================================
    async function loadCreators() {
        currentCreators = await window.shakersssData.getCreators();
        renderCreators(currentCreators);
    }

    function renderCreators(creators) {
        if (!creatorsGrid) return;
        creatorsGrid.innerHTML = '';
        if (creatorsCount) creatorsCount.textContent = creators.length;

        if (creators.length === 0) {
            creatorsGrid.innerHTML = `
                <div class="creators-empty-admin" style="grid-column: 1 / -1; text-align: center; padding: 60px 24px; background: rgba(255,255,255,0.02); border: 2px dashed rgba(255,255,255,0.08); border-radius: 16px;">
                    <div style="font-size: 3.2rem; margin-bottom: 12px;">⚡</div>
                    <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 8px; color: #fff;">No hay creadores actualmente</h3>
                    <p style="font-size: 0.92rem; color: rgba(255,255,255,0.6); max-width: 500px; margin: 0 auto 22px; line-height: 1.5;">Sube imágenes de creadores en masa con recorte de siluetas IA o añade un perfil individual.</p>
                    <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
                        <button type="button" class="btn-primary" id="btn-empty-mass" style="background: linear-gradient(135deg, #FF6B6B, #9B51E0); border: none; font-weight: 800;">
                            <span>⚡ Subir en Masa</span>
                        </button>
                        <button type="button" class="btn-secondary" id="btn-empty-single">
                            <span>+ Añadir Creador</span>
                        </button>
                    </div>
                </div>
            `;
            const emptyMass = document.getElementById('btn-empty-mass');
            if (emptyMass) emptyMass.addEventListener('click', openMassModal);
            const emptySingle = document.getElementById('btn-empty-single');
            if (emptySingle) emptySingle.addEventListener('click', () => openCreatorModal(null));
            return;
        }

        creators.forEach((c, index) => {
            const card = document.createElement('div');
            card.className = 'creator-admin-card';
            card.dataset.id = c.id;

            const isBox = index < 20 && c.inBoxes !== false;
            const s = c.boxSettings || { scale: 1.05, x: 0, y: 0, nameSize: 3.8, nameY: 28, stroke: 12 };

            const photoSrc = c.photo || c.pngPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=480&q=80';

            card.innerHTML = `
                <div class="creator-admin-photo-wrap">
                    <img src="${photoSrc}" alt="${c.name}" class="creator-admin-photo" loading="lazy">
                </div>
                <h4 class="creator-admin-name">${c.name}</h4>
                <span class="creator-admin-meta">${c.category || 'Lifestyle & Trends'} · <span class="creator-meta-color-dot" style="background:${c.color || '#E63946'}"></span> ${c.color || '#E63946'}</span>
                <span class="card-btn-adjust">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                    Ajustar Portada
                </span>
            `;

            card.addEventListener('click', () => openCreatorModal(c));
            creatorsGrid.appendChild(card);
        });
    }

    // ==========================================
    // MASS UPLOAD CONTROLLER & QUEUE PIPELINE
    // ==========================================
    let massQueue = [];
    let isMassProcessing = false;

    function openMassModal() {
        massQueue = [];
        isMassProcessing = false;
        if (massProgressWrap) massProgressWrap.style.display = 'none';
        if (massQueueCard) massQueueCard.style.display = 'none';
        if (btnMassExecute) {
            btnMassExecute.disabled = true;
            btnMassExecuteText.textContent = 'Subir y Recortar con IA (0 imágenes)';
        }
        renderMassQueue();
        if (massUploadModal) massUploadModal.classList.add('is-open');
    }

    function closeMassModal() {
        if (isMassProcessing) {
            if (!confirm('Se está procesando una subida de imágenes. ¿Deseas salir de todas formas?')) {
                return;
            }
        }
        if (massUploadModal) massUploadModal.classList.remove('is-open');
    }

    if (btnMassUploadOpen) btnMassUploadOpen.addEventListener('click', openMassModal);
    if (massModalClose) massModalClose.addEventListener('click', closeMassModal);
    if (massModalOverlay) massModalOverlay.addEventListener('click', closeMassModal);
    if (btnMassCancel) btnMassCancel.addEventListener('click', closeMassModal);

    if (btnMassBrowse && massFilesInput) {
        btnMassBrowse.addEventListener('click', (e) => {
            e.stopPropagation();
            massFilesInput.click();
        });
    }

    if (massDropzone && massFilesInput) {
        massDropzone.addEventListener('click', () => {
            if (!isMassProcessing) massFilesInput.click();
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            massDropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!isMassProcessing) massDropzone.classList.add('is-dragover');
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            massDropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                massDropzone.classList.remove('is-dragover');
            });
        });

        massDropzone.addEventListener('drop', (e) => {
            if (isMassProcessing) return;
            const files = e.dataTransfer.files;
            if (files && files.length > 0) {
                addFilesToMassQueue(files);
            }
        });

        massFilesInput.addEventListener('change', (e) => {
            if (isMassProcessing) return;
            const files = e.target.files;
            if (files && files.length > 0) {
                addFilesToMassQueue(files);
                massFilesInput.value = '';
            }
        });
    }

    function addFilesToMassQueue(files) {
        const startIdx = massQueue.length;
        const existingCount = currentCreators.length;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (!file.type.startsWith('image/')) continue;
            const assignedColor = VIBRANT_BOX_PALETTE[(startIdx + i + existingCount) % VIBRANT_BOX_PALETTE.length];
            const cleanName = formatCleanName(file.name, existingCount + startIdx + i + 1);
            const item = {
                id: `creator-${Date.now()}-${startIdx + i}-${Math.random().toString(36).substr(2, 6)}`,
                file: file,
                rawName: file.name,
                cleanName: cleanName,
                color: assignedColor,
                status: 'pending',
                statusText: 'En espera',
                thumbUrl: URL.createObjectURL(file),
                photoUrl: '',
                pngUrl: ''
            };
            massQueue.push(item);
        }
        renderMassQueue();
    }

    function renderMassQueue() {
        if (!massQueueList) return;
        massQueueList.innerHTML = '';
        if (massQueueNum) massQueueNum.textContent = massQueue.length;

        if (massQueue.length > 0) {
            if (massQueueCard) massQueueCard.style.display = 'block';
            if (btnMassExecute) {
                btnMassExecute.disabled = isMassProcessing;
                btnMassExecuteText.textContent = `Subir y Recortar con IA (${massQueue.length} imágenes)`;
            }
        } else {
            if (massQueueCard) massQueueCard.style.display = 'none';
            if (btnMassExecute) {
                btnMassExecute.disabled = true;
                btnMassExecuteText.textContent = 'Subir y Recortar con IA (0 imágenes)';
            }
        }

        massQueue.forEach((item, idx) => {
            const row = document.createElement('div');
            row.className = 'mass-queue-item';
            row.dataset.itemId = item.id;

            let badgeClass = 'badge-status-pending';
            if (item.status === 'uploading') badgeClass = 'badge-status-uploading';
            if (item.status === 'cutting') badgeClass = 'badge-status-cutting';
            if (item.status === 'done') badgeClass = 'badge-status-done';
            if (item.status === 'error') badgeClass = 'badge-status-error';

            row.innerHTML = `
                <img src="${item.thumbUrl}" alt="" class="mass-queue-thumb">
                <div class="mass-queue-name-col">
                    <input type="text" class="mass-queue-name-input" value="${item.cleanName}" placeholder="Nombre del creador" ${isMassProcessing ? 'disabled' : ''}>
                    <span class="mass-queue-orig-file" title="${item.rawName}">Archivo: ${item.rawName}</span>
                </div>
                <div class="mass-queue-color-col">
                    <span class="mass-color-swatch" style="background-color: ${item.color};"></span>
                    <span class="mass-color-label">${item.color}</span>
                </div>
                <div>
                    <span class="mass-status-badge ${badgeClass}">${item.statusText}</span>
                </div>
                <div>
                    ${!isMassProcessing ? `<button type="button" class="btn-remove-queue-item" title="Quitar archivo">&times;</button>` : ''}
                </div>
            `;

            const nameInput = row.querySelector('.mass-queue-name-input');
            if (nameInput) {
                nameInput.addEventListener('input', (e) => {
                    item.cleanName = e.target.value.trim() || 'Creador';
                });
            }

            const removeBtn = row.querySelector('.btn-remove-queue-item');
            if (removeBtn) {
                removeBtn.addEventListener('click', () => {
                    massQueue.splice(idx, 1);
                    renderMassQueue();
                });
            }

            massQueueList.appendChild(row);
        });
    }

    function updateQueueItemUI(item) {
        if (!massQueueList) return;
        const row = massQueueList.querySelector(`.mass-queue-item[data-item-id="${item.id}"]`);
        if (!row) return;

        const badge = row.querySelector('.mass-status-badge');
        if (badge) {
            badge.className = 'mass-status-badge';
            if (item.status === 'uploading') badge.classList.add('badge-status-uploading');
            else if (item.status === 'cutting') badge.classList.add('badge-status-cutting');
            else if (item.status === 'done') badge.classList.add('badge-status-done');
            else if (item.status === 'error') badge.classList.add('badge-status-error');
            else badge.classList.add('badge-status-pending');
            badge.textContent = item.statusText;
        }
    }

    if (btnMassClear) {
        btnMassClear.addEventListener('click', () => {
            if (isMassProcessing) return;
            massQueue = [];
            renderMassQueue();
        });
    }

    // Execute Mass Upload Pipeline (Requirements 2 & 3)
    if (btnMassExecute) {
        btnMassExecute.addEventListener('click', async () => {
            if (isMassProcessing || massQueue.length === 0) return;

            isMassProcessing = true;
            btnMassExecute.disabled = true;
            if (btnMassCancel) btnMassCancel.disabled = true;
            if (massProgressWrap) massProgressWrap.style.display = 'flex';

            // Always fetch the freshest creators list from storage before batch starts so we never overwrite previous batches
            try {
                currentCreators = await window.shakersssData.getCreators();
            } catch (e) {}

            renderMassQueue();

            const total = massQueue.length;
            let successCount = 0;

            for (let i = 0; i < total; i++) {
                const item = massQueue[i];
                if (item.status === 'done') continue;

                const percent = Math.round((i / total) * 100);
                if (massBarFill) massBarFill.style.width = `${percent}%`;
                if (massProgressCount) massProgressCount.textContent = `${i + 1} / ${total}`;
                if (massProgressTitle) massProgressTitle.textContent = `Procesando (${i + 1} de ${total}): "${item.cleanName}"`;

                // 1. Optimize image first (prevents huge memory exhaustion during background removal & uploads)
                let optimizedPhoto = item.file;
                try {
                    const optBlob = await window.shakersssData._optimizeImage(item.file, false);
                    if (optBlob) {
                        optimizedPhoto = new File([optBlob], item.file.name || 'photo.jpg', { type: 'image/jpeg' });
                    }
                } catch (optErr) {
                    console.warn('[MassUpload] Image pre-optimize warning:', optErr);
                }

                // 2. Upload original photo
                item.status = 'uploading';
                item.statusText = 'Subiendo foto...';
                if (massProgressHint) massProgressHint.textContent = `📤 [1/2] Subiendo foto de "${item.cleanName}"...`;
                updateQueueItemUI(item);

                try {
                    const photoRes = await window.shakersssData.uploadImage(optimizedPhoto, 'creators');
                    item.photoUrl = photoRes.url;
                } catch (photoErr) {
                    console.error('[MassUpload] Error subiendo foto:', photoErr);
                    // Safe fallback: try base64 reader directly so no creator is lost
                    try {
                        const fallbackUrl = await new Promise((res, rej) => {
                            const r = new FileReader();
                            r.onload = e => res(e.target.result);
                            r.onerror = rej;
                            r.readAsDataURL(optimizedPhoto);
                        });
                        item.photoUrl = fallbackUrl;
                    } catch (fbErr) {
                        item.status = 'error';
                        item.statusText = 'Error en foto';
                        updateQueueItemUI(item);
                        continue;
                    }
                }

                // 3. Automated IA cutout background removal (Requirement 3)
                item.status = 'cutting';
                item.statusText = '🪄 Recortando IA...';
                if (massProgressHint) massProgressHint.textContent = `🪄 [2/2] Extrayendo silueta transparente con IA para "${item.cleanName}"...`;
                updateQueueItemUI(item);

                let pngUrl = '';
                try {
                    const cutoutBlob = await removeImageBackground(optimizedPhoto);
                    if (cutoutBlob) {
                        const optCutout = await window.shakersssData._optimizeImage(cutoutBlob, true);
                        const cleanSlug = item.cleanName.toLowerCase().replace(/[^a-z0-9]/g, '_');
                        const cutoutFile = new File([optCutout || cutoutBlob], `${cleanSlug}_cutout_${Date.now()}.png`, { type: 'image/png' });
                        const pngRes = await window.shakersssData.uploadImage(cutoutFile, 'creators_png');
                        pngUrl = pngRes.url;
                    }
                } catch (aiErr) {
                    console.warn('[MassUpload] Aviso en recorte automático de', item.cleanName, aiErr);
                    // Fallback: if cutout fails, keep empty so box uses original photo gracefully
                    pngUrl = '';
                }
                item.pngUrl = pngUrl;

                // 4. Build creator object with smart defaults and GUARANTEED UNIQUE ID
                const uniqueId = item.id || `creator-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 6)}`;
                const slug = item.cleanName.toLowerCase().replace(/[^a-z0-9]/g, '-') || uniqueId;
                const category = massDefaultCategory ? massDefaultCategory.value : 'Lifestyle & Trends';
                const metrics = massDefaultMetrics ? massDefaultMetrics.value.trim() : '+500K Seguidores · 9.8% Engagement · España';
                const inBoxes = massDefaultInBoxes ? massDefaultInBoxes.checked : true;

                const newCreator = {
                    id: uniqueId, // CRITICAL: NEVER overwrite another creator by using a generic slug
                    name: item.cleanName,
                    photo: item.photoUrl,
                    pngPhoto: item.pngUrl,
                    color: item.color,
                    inBoxes: inBoxes,
                    category: category,
                    bio: `Creador referente en ${category}. Colaborador exclusivo de SHAKERSSS Agency para activaciones virales y contenido digital.`,
                    metrics: metrics,
                    instagram: `@${slug.replace(/-/g, '.')}.shake`,
                    tiktok: `@${slug.replace(/-/g, '_')}`,
                    youtube: `${item.cleanName}Official`,
                    boxSettings: {
                        scale: 1.05,
                        x: 0,
                        y: 0,
                        nameSize: 3.6,
                        nameY: 25,
                        stroke: 4.5
                    }
                };

                // Check ONLY by unique ID so we never overwrite other creators
                const existingIdx = currentCreators.findIndex(c => c.id === uniqueId);
                if (existingIdx !== -1) {
                    currentCreators[existingIdx] = newCreator;
                } else {
                    currentCreators.push(newCreator);
                }

                item.status = 'done';
                item.statusText = '✓ Listo';
                updateQueueItemUI(item);
                successCount++;

                // Persist incrementally to safe store
                await window.shakersssData.saveCreators(currentCreators);
                renderCreators(currentCreators);
            }

            if (massBarFill) massBarFill.style.width = '100%';
            if (massProgressCount) massProgressCount.textContent = `${total} / ${total}`;
            if (massProgressTitle) massProgressTitle.textContent = `¡Completado! Se han añadido ${successCount} creadores.`;
            if (massProgressHint) massProgressHint.textContent = `✓ Catálogo sincronizado con éxito.`;

            showToast(`✓ Subida completada: ${successCount} creadores añadidos.`);

            setTimeout(() => {
                isMassProcessing = false;
                if (btnMassCancel) btnMassCancel.disabled = false;
                closeMassModal();
            }, 1400);
        });
    }

    // Clear All Creators Button (Requirement 1)
    if (btnClearAllCreators) {
        btnClearAllCreators.addEventListener('click', async () => {
            if (confirm('¿Estás seguro de que deseas eliminar TODOS los creadores? Esta acción vaciará el catálogo actual.')) {
                currentCreators = [];
                await window.shakersssData.saveCreators([]);
                renderCreators([]);
                showToast('Todos los creadores han sido eliminados.');
            }
        });
    }

    // Search Creators
    searchCreators.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const filtered = currentCreators.filter(c => 
            c.name.toLowerCase().includes(query) || 
            c.id.toLowerCase().includes(query) ||
            (c.category && c.category.toLowerCase().includes(query))
        );
        renderCreators(filtered);
    });

    // Open Creator Modal
    function openCreatorModal(creator = null) {
        // Reset tabs to file upload
        if (creatorTabFileBtn) creatorTabFileBtn.click();
        if (creatorUploadStatus) creatorUploadStatus.style.display = 'none';
        if (creatorPngTabFileBtn) creatorPngTabFileBtn.click();
        if (creatorPngUploadStatus) creatorPngUploadStatus.style.display = 'none';
        if (creatorCutoutStatus) creatorCutoutStatus.style.display = 'none';

        if (creator) {
            creatorModalTitle.textContent = `Editar Creador: ${creator.name}`;
            creatorEditId.value = creator.id;
            creatorName.value = creator.name;
            creatorPhoto.value = creator.photo;
            creatorPngPhoto.value = creator.pngPhoto || '';
            creatorColor.value = creator.color || '#E63946';
            creatorColorText.value = creator.color || '#E63946';
            creatorInBoxes.checked = creator.inBoxes !== false;
            creatorCategory.value = creator.category || 'Lifestyle & Fashion';
            creatorMetrics.value = creator.metrics || '+1.2M Seguidores · 9.4% Engagement';
            creatorBio.value = creator.bio || '';
            creatorInstagram.value = creator.instagram || '';
            creatorTiktok.value = creator.tiktok || '';
            creatorYoutube.value = creator.youtube || '';
            btnDeleteCreator.style.display = 'block';
        } else {
            creatorModalTitle.textContent = 'Nuevo Creador';
            creatorEditId.value = '';
            creatorName.value = '';
            creatorPhoto.value = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
            creatorPngPhoto.value = '';
            creatorColor.value = '#7ED4C8';
            creatorColorText.value = '#7ED4C8';
            creatorInBoxes.checked = true;
            creatorCategory.value = 'Lifestyle & Fashion';
            creatorMetrics.value = '+1.0M Seguidores · 10% Engagement · España';
            creatorBio.value = '';
            creatorInstagram.value = '';
            creatorTiktok.value = '';
            creatorYoutube.value = '';
            btnDeleteCreator.style.display = 'none';
        }

        // Initialize Studio Sliders with creator's settings or defaults
        const bs = (creator && creator.boxSettings) ? creator.boxSettings : { scale: 1.05, y: 0, x: 0, nameSize: 3.6, nameY: 25, stroke: 4.5 };
        if (sliderStudioScale) sliderStudioScale.value = bs.scale ?? 1.05;
        if (sliderStudioY) sliderStudioY.value = bs.y ?? 0;
        if (sliderStudioX) sliderStudioX.value = bs.x ?? 0;
        if (sliderStudioNameSize) sliderStudioNameSize.value = bs.nameSize ?? 3.6;
        if (sliderStudioNameY) sliderStudioNameY.value = bs.nameY ?? 25;
        if (sliderStudioStroke) sliderStudioStroke.value = bs.stroke ?? 4.5;
        if (toggleNameOneline) toggleNameOneline.checked = bs.nameOneLine ?? false;

        updateCreatorPreview();
        updateStudioViewer();
        creatorModal.classList.add('is-open');
    }

    function closeCreatorModal() {
        creatorModal.classList.remove('is-open');
    }

    creatorModalClose.addEventListener('click', closeCreatorModal);
    creatorModalOverlay.addEventListener('click', closeCreatorModal);
    btnCancelCreator.addEventListener('click', closeCreatorModal);
    btnAddCreator.addEventListener('click', () => openCreatorModal(null));

    // Live Modal Preview Updates
    function updateCreatorPreview() {
        creatorPreviewImg.src = creatorPhoto.value || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
        creatorPreviewBox.style.backgroundColor = creatorColor.value;
        creatorPreviewBoxName.textContent = creatorName.value || 'Nombre';
        if (creatorPreviewCategory) {
            creatorPreviewCategory.textContent = creatorCategory.value || 'Lifestyle & Fashion';
        }

        // PNG Cutout Preview
        const pngSrc = creatorPngPhoto ? creatorPngPhoto.value.trim() : '';
        if (creatorPreviewPng) {
            if (pngSrc) {
                creatorPreviewPng.src = pngSrc;
                creatorPreviewPng.classList.add('is-loaded');
                if (pngEmptyHint) pngEmptyHint.style.display = 'none';
            } else {
                creatorPreviewPng.src = '';
                creatorPreviewPng.classList.remove('is-loaded');
                if (pngEmptyHint) pngEmptyHint.style.display = 'block';
            }
        }

        // Live update the Cereal Box Studio viewer
        updateStudioViewer();
    }

    // ==========================================
    // CEREAL BOX STUDIO LIVE VIEWER LOGIC
    // ==========================================
    function updateStudioViewer() {
        if (!studioBoxFront) return;
        const color = creatorColor.value || '#E63946';
        const name = creatorName.value.trim() || 'Bruno Casanova';
        const photo = creatorPhoto.value || '';
        const png = creatorPngPhoto ? creatorPngPhoto.value.trim() : '';

        const scale = sliderStudioScale ? parseFloat(sliderStudioScale.value) || 1.05 : 1.05;
        const y = sliderStudioY ? parseInt(sliderStudioY.value, 10) || 0 : 0;
        const x = sliderStudioX ? parseInt(sliderStudioX.value, 10) || 0 : 0;
        const nameSize = sliderStudioNameSize ? parseFloat(sliderStudioNameSize.value) || 3.6 : 3.6;
        const nameY = sliderStudioNameY ? parseInt(sliderStudioNameY.value, 10) || 25 : 25;
        const stroke = sliderStudioStroke ? parseFloat(sliderStudioStroke.value) || 4.5 : 4.5;

        // Update indicator badges
        if (valStudioScale) valStudioScale.textContent = `${Math.round(scale * 100)}%`;
        if (valStudioY) valStudioY.textContent = `${y > 0 ? '+' : ''}${y}px`;
        if (valStudioX) valStudioX.textContent = `${x > 0 ? '+' : ''}${x}px`;
        if (valStudioNameSize) valStudioNameSize.textContent = `${nameSize.toFixed(1)}rem`;
        if (valStudioNameY) valStudioNameY.textContent = `${nameY}%`;
        if (valStudioStroke) valStudioStroke.textContent = `${stroke}px`;

        // Apply canonical CSS variables matching home page exactly
        studioBoxFront.style.setProperty('--box-color', color);
        studioBoxFront.style.setProperty('--box-cutout-scale', scale);
        studioBoxFront.style.setProperty('--box-cutout-y', `${y}px`);
        studioBoxFront.style.setProperty('--box-cutout-x', `${x}px`);
        studioBoxFront.style.setProperty('--box-name-size', `${nameSize}rem`);
        studioBoxFront.style.setProperty('--box-name-top', `${nameY}%`);
        studioBoxFront.style.setProperty('--box-name-stroke', `${stroke}px`);

        // Legacy studio fallbacks
        studioBoxFront.style.setProperty('--studio-box-color', color);
        studioBoxFront.style.setProperty('--studio-scale', scale);
        studioBoxFront.style.setProperty('--studio-cutout-y', `${y}px`);
        studioBoxFront.style.setProperty('--studio-cutout-x', `${x}px`);
        studioBoxFront.style.setProperty('--studio-name-size', `${nameSize}rem`);
        studioBoxFront.style.setProperty('--studio-name-y', `${nameY}%`);
        studioBoxFront.style.setProperty('--studio-stroke', `${stroke}px`);

        if (studioCreatorName) {
            const forceOneLine = toggleNameOneline ? toggleNameOneline.checked : false;
            if (forceOneLine) {
                studioCreatorName.textContent = name;
            } else {
                // Smart name formatting (two lines when applicable)
                const words = name.trim().split(/\s+/);
                if (words.length === 2 && words[1].length > 2 && name.length > 9) {
                    studioCreatorName.textContent = `${words[0]}\n${words[1]}`;
                } else if (words.length === 3 && words[0].length + words[1].length < 12) {
                    studioCreatorName.textContent = `${words[0]} ${words[1]}\n${words[2]}`;
                } else {
                    studioCreatorName.textContent = name;
                }
            }
        }

        // Update live side badges matching reference
        const categoryEl = document.getElementById('studio-badge-category');
        if (categoryEl) {
            categoryEl.textContent = creatorCategory.value.trim() || 'Moda y música';
        }
        const metricsEl = document.getElementById('studio-badge-metrics');
        if (metricsEl) {
            const rawMetrics = creatorMetrics ? creatorMetrics.value.trim() : '';
            const firstMetric = rawMetrics.split('·')[0].trim();
            metricsEl.textContent = firstMetric || '+500k';
        }

        const activeImgSrc = png || photo;
        if (studioCutoutImg) {
            if (activeImgSrc) {
                studioCutoutImg.src = activeImgSrc;
                studioCutoutImg.style.display = 'block';
                if (!png) {
                    studioCutoutImg.classList.add('is-fallback-photo');
                } else {
                    studioCutoutImg.classList.remove('is-fallback-photo');
                }
            } else {
                studioCutoutImg.style.display = 'none';
            }
        }
    }

    // Attach listeners to all studio sliders
    [sliderStudioScale, sliderStudioY, sliderStudioX, sliderStudioNameSize, sliderStudioNameY, sliderStudioStroke].forEach(slider => {
        if (slider) {
            slider.addEventListener('input', updateStudioViewer);
        }
    });

    // Attach listener to name line toggle
    if (toggleNameOneline) {
        toggleNameOneline.addEventListener('change', updateStudioViewer);
    }

    // Reset button
    if (btnStudioReset) {
        btnStudioReset.addEventListener('click', () => {
            if (sliderStudioScale) sliderStudioScale.value = 1.05;
            if (sliderStudioY) sliderStudioY.value = 0;
            if (sliderStudioX) sliderStudioX.value = 0;
            if (sliderStudioNameSize) sliderStudioNameSize.value = 3.0;
            if (sliderStudioNameY) sliderStudioNameY.value = 22;
            if (sliderStudioStroke) sliderStudioStroke.value = 4;
            updateStudioViewer();
            showToast('Ajustes de portada restablecidos a los valores recomendados.');
        });
    }

    creatorPhoto.addEventListener('input', updateCreatorPreview);
    if (creatorPngPhoto) creatorPngPhoto.addEventListener('input', updateCreatorPreview);
    creatorName.addEventListener('input', updateCreatorPreview);
    creatorCategory.addEventListener('input', updateCreatorPreview);
    creatorColor.addEventListener('input', () => {
        creatorColorText.value = creatorColor.value;
        updateCreatorPreview();
    });
    creatorColorText.addEventListener('input', () => {
        if (/^#[0-9A-Fa-f]{6}$/.test(creatorColorText.value)) {
            creatorColor.value = creatorColorText.value;
            updateCreatorPreview();
        }
    });

    // Save Creator
    creatorEditForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = btnSaveCreator || creatorEditForm.querySelector('button[type="submit"]');
        const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Guardar Creador';

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg class="spin-icon" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: adminSpin 0.75s linear infinite; margin-right: 6px; vertical-align: middle; display: inline-block;">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity="0.25"></circle>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor"></path>
                </svg>
                <span>Guardando...</span>
            `;
        }

        try {
            const id = creatorEditId.value || `creator-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
            const updated = {
                id: id,
                name: creatorName.value.trim(),
                photo: creatorPhoto.value.trim(),
                pngPhoto: creatorPngPhoto ? creatorPngPhoto.value.trim() : '',
                color: creatorColor.value,
                inBoxes: creatorInBoxes.checked,
                category: creatorCategory.value.trim() || 'Lifestyle & Trends',
                bio: creatorBio.value.trim(),
                instagram: creatorInstagram.value.trim(),
                tiktok: creatorTiktok.value.trim(),
                youtube: creatorYoutube.value.trim(),
                metrics: creatorMetrics.value.trim() || '+1.2M Seguidores · 9.4% Engagement',
                boxSettings: {
                    scale: sliderStudioScale ? parseFloat(sliderStudioScale.value) || 1.05 : 1.05,
                    y: sliderStudioY ? parseInt(sliderStudioY.value, 10) || 0 : 0,
                    x: sliderStudioX ? parseInt(sliderStudioX.value, 10) || 0 : 0,
                    nameSize: sliderStudioNameSize ? parseFloat(sliderStudioNameSize.value) || 3.6 : 3.6,
                    nameY: sliderStudioNameY ? parseInt(sliderStudioNameY.value, 10) || 25 : 25,
                    stroke: sliderStudioStroke ? parseFloat(sliderStudioStroke.value) || 4.5 : 4.5,
                    nameOneLine: toggleNameOneline ? toggleNameOneline.checked : false
                }
            };

            // --- TEXTURE CAPTURE: Render the editor canvas as a PNG ---
            try {
                const studioStage = document.getElementById('studio-viewer-stage');
                if (studioStage && typeof html2canvas === 'function') {
                    const canvas = await html2canvas(studioStage, {
                        width: 320,
                        height: 400,
                        scale: 2, // 2x for retina quality (640x800 output)
                        useCORS: true,
                        allowTaint: true,
                        backgroundColor: null,
                        logging: false,
                    });
                    updated.boxTexture = canvas.toDataURL('image/png', 0.92);
                }
            } catch (texErr) {
                console.warn('[Texture capture failed]', texErr);
                // Continue saving without texture — will fall back to CSS rendering
            }

            const existingIndex = currentCreators.findIndex(c => c.id === id);
            if (existingIndex !== -1) {
                currentCreators[existingIndex] = updated;
            } else {
                currentCreators.unshift(updated);
            }

            // 1. Visual feedback on submit button
            if (submitBtn) {
                submitBtn.innerHTML = `<span>✓ ¡Guardado!</span>`;
                submitBtn.classList.add('is-success');
            }

            // 2. Devolver al menú general inmediatamente (Cerrar modal)
            closeCreatorModal();

            // 3. Renderizar creadores en la vista general
            renderCreators(currentCreators);

            // 4. Highlight the saved creator card and attach "Guardado" badge
            setTimeout(() => {
                const savedCard = creatorsGrid.querySelector(`.creator-admin-card[data-id="${id}"]`);
                if (savedCard) {
                    savedCard.classList.add('just-saved-highlight');
                    const badge = document.createElement('span');
                    badge.className = 'badge-just-saved';
                    badge.textContent = '✓ Guardado';
                    savedCard.appendChild(badge);
                    savedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    setTimeout(() => {
                        savedCard.classList.remove('just-saved-highlight');
                        badge.remove();
                    }, 4000);
                }
            }, 60);

            // 5. Update header status text to show "Guardado"
            const nowTime = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            if (statusText) {
                statusText.innerHTML = `<span style="color: var(--brand-mint); font-weight: 800;">✓ Guardado</span> (${nowTime})`;
            }
            if (dbStatusPill) {
                dbStatusPill.classList.add('is-saved-flash');
                setTimeout(() => {
                    dbStatusPill.classList.remove('is-saved-flash');
                }, 4000);
            }

            // 6. Prominent Toast Notification
            showToast(`✓ Guardado: "${updated.name}" actualizado con éxito.`);

            // 7. Persist (IndexedDB + safe LocalStorage + Supabase)
            await window.shakersssData.saveCreators(currentCreators);

        } catch (err) {
            console.error('[Error saving creator]', err);
            alert(`Error al guardar: ${err.message || err}`);
            showToast('⚠️ Error al guardar los cambios');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnHtml;
                    submitBtn.classList.remove('is-success');
                }, 1200);
            }
        }
    });

    // Delete Creator
    btnDeleteCreator.addEventListener('click', async () => {
        const id = creatorEditId.value;
        if (!id) return;
        if (confirm(`¿Seguro que deseas eliminar este creador?`)) {
            currentCreators = currentCreators.filter(c => c.id !== id);
            await window.shakersssData.saveCreators(currentCreators);
            renderCreators(currentCreators);
            closeCreatorModal();
            showToast('Creador eliminado.');
        }
    });

    // ==========================================
    // 5. SUCCESS CASES SECTION
    // ==========================================
    async function loadCases() {
        currentCases = await window.shakersssData.getSuccessCases();
        renderCases(currentCases);
    }

    function renderCases(cases) {
        casesGrid.innerHTML = '';
        casesCount.textContent = cases.length;

        cases.forEach(cs => {
            const card = document.createElement('div');
            card.className = 'case-admin-card';
            card.dataset.id = cs.id;

            card.innerHTML = `
                <div class="case-admin-top">
                    <div class="case-bowl-thumb-wrap">
                        <img src="${cs.photo}" alt="" class="case-bowl-thumb-photo">
                        <img src="${cs.bowl}" alt="" class="case-bowl-thumb-rim">
                    </div>
                    <div>
                        <span class="case-brand-tag">${cs.brand}</span>
                        <h4 class="case-admin-title">${cs.title}</h4>
                    </div>
                </div>
                <div class="case-admin-meta">${cs.meta}</div>
            `;

            card.addEventListener('click', () => openCaseModal(cs));
            casesGrid.appendChild(card);
        });
    }

    function openCaseModal(cs = null) {
        if (caseTabFileBtn) caseTabFileBtn.click();
        if (caseUploadStatus) caseUploadStatus.style.display = 'none';

        if (cs) {
            caseModalTitle.textContent = `Editar Caso: ${cs.brand}`;
            caseEditId.value = cs.id;
            caseBrand.value = cs.brand;
            caseTitle.value = cs.title;
            caseMeta.value = cs.meta;
            casePhoto.value = cs.photo;
            
            // Set bowl radio
            const radio = document.querySelector(`input[name="case-bowl"][value="${cs.bowl}"]`);
            if (radio) radio.checked = true;

            btnDeleteCase.style.display = 'block';
        } else {
            caseModalTitle.textContent = 'Nuevo Caso de Éxito';
            caseEditId.value = '';
            caseBrand.value = '';
            caseTitle.value = '';
            caseMeta.value = '';
            casePhoto.value = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=480&q=80';
            btnDeleteCase.style.display = 'none';
        }
        caseModal.classList.add('is-open');
    }

    function closeCaseModal() {
        caseModal.classList.remove('is-open');
    }

    caseModalClose.addEventListener('click', closeCaseModal);
    caseModalOverlay.addEventListener('click', closeCaseModal);
    btnCancelCase.addEventListener('click', closeCaseModal);
    btnAddCase.addEventListener('click', () => openCaseModal(null));

    // Save Case
    caseEditForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = btnSaveCase || caseEditForm.querySelector('button[type="submit"]');
        const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Guardar Caso';

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg class="spin-icon" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: adminSpin 0.75s linear infinite; margin-right: 6px; vertical-align: middle; display: inline-block;">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity="0.25"></circle>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor"></path>
                </svg>
                <span>Guardando...</span>
            `;
        }

        try {
            const id = caseEditId.value || `case-${Date.now()}`;
            const selectedBowl = document.querySelector('input[name="case-bowl"]:checked')?.value || 'bol_mint.png?v=sat_v2';
            
            const updated = {
                id: id,
                brand: caseBrand.value.trim().toUpperCase(),
                title: caseTitle.value.trim(),
                meta: caseMeta.value.trim(),
                photo: casePhoto.value.trim(),
                bowl: selectedBowl,
                spoon: 'cuchara_1.png',
                spoonSide: 'spoon-left',
                stain: 'stain-top-right'
            };

            const existingIndex = currentCases.findIndex(c => c.id === id);
            if (existingIndex !== -1) {
                currentCases[existingIndex] = { ...currentCases[existingIndex], ...updated };
            } else {
                currentCases.push(updated);
            }

            await window.shakersssData.saveSuccessCases(currentCases);

            if (submitBtn) {
                submitBtn.innerHTML = `<span>✓ ¡Guardado!</span>`;
                submitBtn.classList.add('is-success');
            }

            closeCaseModal();
            renderCases(currentCases);

            const nowTime = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            if (statusText) {
                statusText.innerHTML = `<span style="color: var(--brand-mint); font-weight: 800;">✓ Guardado</span> (${nowTime})`;
            }

            showToast(`✓ Guardado: Caso "${updated.brand}" actualizado correctamente.`);
        } catch (err) {
            console.error('[Error saving case]', err);
            alert(`Error al guardar caso: ${err.message || err}`);
            showToast('⚠️ Error al guardar el caso');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnHtml;
                    submitBtn.classList.remove('is-success');
                }, 1200);
            }
        }
    });

    // Delete Case
    btnDeleteCase.addEventListener('click', async () => {
        const id = caseEditId.value;
        if (!id) return;
        if (confirm(`¿Eliminar este caso de éxito?`)) {
            currentCases = currentCases.filter(c => c.id !== id);
            await window.shakersssData.saveSuccessCases(currentCases);
            renderCases(currentCases);
            closeCaseModal();
            showToast('Caso eliminado.');
        }
    });

    // ==========================================
    // 6. SUPABASE & TOOLS SECTION
    // ==========================================
    function loadSupabaseConfigInputs() {
        const cfg = window.shakersssData.getSupabaseConfig();
        supabaseUrlInput.value = cfg.url || '';
        supabaseKeyInput.value = cfg.key || '';
    }

    supabaseForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const url = supabaseUrlInput.value.trim();
        const key = supabaseKeyInput.value.trim();

        if (!url || !key) {
            alert('Por favor introduce tanto la URL como la Anon Key de Supabase.');
            return;
        }

        window.shakersssData.saveSupabaseConfig(url, key);
        updateDbStatus();

        if (window.shakersssData.isSupabaseConnected()) {
            showToast('¡Conexión con Supabase guardada y activa!');
            // Sync current data to Supabase
            await window.shakersssData.saveCreators(currentCreators);
            await window.shakersssData.saveSuccessCases(currentCases);
            showToast('¡Datos sincronizados con la nube de Supabase!');
        } else {
            alert('No se pudo inicializar la conexión. Comprueba que la URL y la Anon Key sean válidas.');
        }
    });

    btnDisconnectSupabase.addEventListener('click', () => {
        window.shakersssData.saveSupabaseConfig('', '');
        loadSupabaseConfigInputs();
        updateDbStatus();
        showToast('Supabase desconectado. Modo Local activo.');
    });

    // Seed Supabase with entire catalog (50 creators + 7 cases)
    const btnSeedSupabase = document.getElementById('btn-seed-supabase');
    if (btnSeedSupabase) {
        btnSeedSupabase.addEventListener('click', async () => {
            if (!window.shakersssData.isSupabaseConnected()) {
                alert('Primero asegúrate de que Supabase esté conectado y las tablas creadas en tu proyecto.');
                return;
            }
            btnSeedSupabase.disabled = true;
            btnSeedSupabase.innerHTML = '<span>Subiendo...</span>';
            try {
                await window.shakersssData.saveCreators(currentCreators);
                await window.shakersssData.saveSuccessCases(currentCases);
                showToast('¡Catálogo completo (50 creadores y 7 casos) subido a Supabase!');
            } catch (err) {
                alert('Error al subir a Supabase. ¿Has ejecutado el script SQL en Supabase?: ' + err.message);
            } finally {
                btnSeedSupabase.disabled = false;
                btnSeedSupabase.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                    <span>Subir Catálogo a Supabase</span>
                `;
            }
        });
    }

    // Copy SQL
    btnCopySql.addEventListener('click', () => {
        navigator.clipboard.writeText(sqlCode.textContent);
        const originalHtml = btnCopySql.innerHTML;
        btnCopySql.innerHTML = `<span>¡Copiado!</span>`;
        setTimeout(() => {
            btnCopySql.innerHTML = originalHtml;
        }, 2000);
    });

    // Export Backup JSON
    btnExportJson.addEventListener('click', () => {
        const backup = {
            exportDate: new Date().toISOString(),
            creators: currentCreators,
            successCases: currentCases
        };
        const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `shakersss_backup_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('Backup JSON descargado.');
    });

    // Import Backup JSON
    importJsonFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const data = JSON.parse(event.target.result);
                if (data.creators && Array.isArray(data.creators)) {
                    currentCreators = data.creators;
                    await window.shakersssData.saveCreators(currentCreators);
                    renderCreators(currentCreators);
                }
                if (data.successCases && Array.isArray(data.successCases)) {
                    currentCases = data.successCases;
                    await window.shakersssData.saveSuccessCases(currentCases);
                    renderCases(currentCases);
                }
                showToast('¡Datos importados con éxito!');
            } catch (err) {
                alert('Archivo JSON no válido.');
            }
        };
        reader.readAsText(file);
    });

    // Reset Defaults
    btnResetDefaults.addEventListener('click', async () => {
        if (confirm('¿Restablecer todos los creadores y casos de éxito a los valores originales de fábrica? Se perderán las modificaciones locales.')) {
            const defaults = await window.shakersssData.resetToDefaults();
            currentCreators = defaults.creators;
            currentCases = defaults.cases;
            renderCreators(currentCreators);
            renderCases(currentCases);
            showToast('Valores restaurados a valores de fábrica.');
        }
    });

    // Start
    checkAuth();
});
