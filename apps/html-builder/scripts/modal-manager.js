/**
 * Modal Manager - Gerencia todas as janelas modais da aplicação
 * Responsável por abrir, fechar e gerenciar interações dos modais
 */

class ModalManager {
    constructor(app) {
        this.app = app;
        this.activeModal = null;
        this.modals = new Map();
        this.overlay = null;
        this.init();
    }

    init() {
        this.createOverlay();
        this.setupModals();
        this.setupEventListeners();
    }

    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'modal-overlay';
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeIn 0.2s ease-out;
        `;
        
        document.body.appendChild(this.overlay);
    }

    setupModals() {
        // Export Modal
        const exportModal = document.getElementById('exportModal');
        if (exportModal) {
            this.modals.set('export', exportModal);
        }

        // Preview Modal
        const previewModal = document.getElementById('previewModal');
        if (previewModal) {
            this.modals.set('preview', previewModal);
        }

        // Save to Hub Modal
        const saveToHubModal = document.getElementById('saveToHubModal');
        if (saveToHubModal) {
            this.modals.set('saveToHub', saveToHubModal);
        }

        // Setup modal-specific functionality
        this.setupModalSpecifics();
    }

    setupModalSpecifics() {
        // Export Modal specifics
        this.setupExportModal();
        
        // Preview Modal specifics
        this.setupPreviewModal();
        
        // Save to Hub Modal specifics
        this.setupSaveToHubModal();
    }

    setupExportModal() {
        const exportModal = this.modals.get('export');
        if (!exportModal) return;

        // Export mode change handler
        const exportModeRadios = exportModal.querySelectorAll('input[name="exportMode"]');
        exportModeRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                this.updateExportCode();
            });
        });

        // Copy code button
        const copyCodeBtn = exportModal.querySelector('#copyCode');
        if (copyCodeBtn) {
            copyCodeBtn.addEventListener('click', () => this.copyExportCode());
        }

        // Download code button
        const downloadCodeBtn = exportModal.querySelector('#downloadCode');
        if (downloadCodeBtn) {
            downloadCodeBtn.addEventListener('click', () => this.downloadExportCode());
        }
    }

    setupPreviewModal() {
        const previewModal = this.modals.get('preview');
        if (!previewModal) return;

        // Setup preview frame
        const previewFrame = previewModal.querySelector('#previewFrame');
        if (previewFrame) {
            // Set sandbox attributes for security
            previewFrame.setAttribute('sandbox', 'allow-scripts allow-forms allow-same-origin');
        }
    }

    setupSaveToHubModal() {
        const saveToHubModal = this.modals.get('saveToHub');
        if (!saveToHubModal) return;

        // Setup save to hub functionality
        const confirmSaveBtn = saveToHubModal.querySelector('#confirmSaveToHub');
        if (confirmSaveBtn) {
            confirmSaveBtn.addEventListener('click', () => this.confirmSaveToHub());
        }

        // Auto-populate project name
        const projectNameInput = saveToHubModal.querySelector('#hubProjectName');
        if (projectNameInput) {
            projectNameInput.value = window.HTMLBuilder.currentProject.name || 'Minha Página HTML';
        }

        // Check hub availability
        this.checkHubAvailability();
    }

    setupEventListeners() {
        // Overlay click to close
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.closeModal();
            }
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                this.closeModal();
            }
        });

        // Close buttons
        document.querySelectorAll('.modal-close, .modal .btn').forEach(btn => {
            if (btn.textContent.trim() === 'Fechar' || btn.classList.contains('modal-close')) {
                btn.addEventListener('click', () => this.closeModal());
            }
        });
    }

    openModal(modalName) {
        const modal = this.modals.get(modalName);
        if (!modal) {
            console.warn(`Modal "${modalName}" not found`);
            return;
        }

        // Close any active modal
        if (this.activeModal) {
            this.closeModal();
        }

        // Show overlay
        this.overlay.style.display = 'flex';
        
        // Show modal
        modal.classList.add('show');
        modal.style.display = 'flex';
        
        // Set active modal
        this.activeModal = modalName;
        
        // Modal-specific setup
        this.setupActiveModal(modalName);
        
        // Focus management
        this.focusModal(modal);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        if (!this.activeModal) return;

        const modal = this.modals.get(this.activeModal);
        if (!modal) return;

        // Hide modal
        modal.classList.remove('show');
        modal.style.display = 'none';
        
        // Hide overlay
        this.overlay.style.display = 'none';
        
        // Clear active modal
        this.activeModal = null;
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Cleanup modal-specific data
        this.cleanupModal(modal);
    }

    setupActiveModal(modalName) {
        switch (modalName) {
            case 'export':
                this.setupExportModalView();
                break;
            case 'preview':
                this.setupPreviewModalView();
                break;
            case 'saveToHub':
                this.setupSaveToHubModalView();
                break;
        }
    }

    setupExportModalView() {
        this.updateExportCode();
    }

    setupPreviewModalView() {
        const previewFrame = document.getElementById('previewFrame');
        if (previewFrame) {
            const html = this.generatePreviewHTML();
            previewFrame.srcdoc = html;
        }
    }

    setupSaveToHubModalView() {
        this.checkHubAvailability();
        this.updateSaveToHubStatus('Pronto para salvar no Hub', 'info');
    }

    updateExportCode() {
        const codeOutput = document.getElementById('codeOutput');
        if (!codeOutput || !window.ExportManager) return;

        // Get export mode
        const exportMode = document.querySelector('input[name="exportMode"]:checked')?.value || 'single';
        
        // Set export options
        window.ExportManager.setExportOptions({ mode: exportMode });
        
        // Generate code
        const html = window.ExportManager.generateHTML(window.HTMLBuilder.currentProject);
        codeOutput.value = html;
    }

    copyExportCode() {
        const codeOutput = document.getElementById('codeOutput');
        if (!codeOutput) return;

        codeOutput.select();
        codeOutput.setSelectionRange(0, 99999); // For mobile devices

        navigator.clipboard.writeText(codeOutput.value).then(() => {
            this.showNotification('Código copiado para a área de transferência!', 'success');
        }).catch(err => {
            // Fallback for older browsers
            document.execCommand('copy');
            this.showNotification('Código copiado!', 'success');
        });
    }

    downloadExportCode() {
        if (!window.ExportManager) return;

        const project = window.HTMLBuilder.currentProject;
        const exportMode = document.querySelector('input[name="exportMode"]:checked')?.value || 'single';
        
        window.ExportManager.setExportOptions({ mode: exportMode });
        
        if (exportMode === 'single') {
            const html = window.ExportManager.generateHTML(project);
            this.downloadFile(`${this.sanitizeFilename(project.name || 'pagina')}.html`, html, 'text/html');
        } else {
            // Download both HTML and CSS files
            const projectName = this.sanitizeFilename(project.name || 'pagina');
            
            // HTML file
            const html = window.ExportManager.generateHTML(project);
            this.downloadFile(`${projectName}.html`, html, 'text/html');
            
            // CSS file
            setTimeout(() => {
                const css = window.ExportManager.generateSeparatedCSS(project);
                this.downloadFile('styles.css', css, 'text/css');
            }, 500);
        }
    }

    generatePreviewHTML() {
        if (!window.ExportManager) {
            return '<!DOCTYPE html><html><head><title>Preview</title></head><body><h1>Preview não disponível</h1></body></html>';
        }

        return window.ExportManager.generatePreviewHTML(window.HTMLBuilder.currentProject);
    }

    async confirmSaveToHub() {
        if (!window.hubIntegration) {
            this.updateSaveToHubStatus('Integração com Hub não disponível', 'error');
            return;
        }

        const projectName = document.getElementById('hubProjectName')?.value || 'Minha Página HTML';
        const description = document.getElementById('hubProjectDescription')?.value || '';
        const tags = document.getElementById('hubProjectTags')?.value || '';

        try {
            this.updateSaveToHubStatus('Salvando no Hub...', 'info');
            
            const documentData = {
                title: projectName,
                content: this.generatePreviewHTML(),
                metadata: {
                    type: 'html-page',
                    description: description,
                    tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                    created: new Date().toISOString(),
                    projectData: window.HTMLBuilder.currentProject,
                    exportOptions: window.ExportManager?.getExportOptions() || {}
                }
            };

            await window.hubIntegration.saveToHub(documentData);
            
            this.updateSaveToHubStatus('Projeto salvo no Hub com sucesso!', 'success');
            
            setTimeout(() => {
                this.closeModal();
            }, 2000);

        } catch (error) {
            console.error('Error saving to hub:', error);
            this.updateSaveToHubStatus(`Erro ao salvar: ${error.message}`, 'error');
        }
    }

    checkHubAvailability() {
        const hubStatus = document.getElementById('hubStatus');
        if (!hubStatus) return;

        if (window.hubIntegration) {
            this.updateSaveToHubStatus('Hub disponível - pronto para salvar', 'info');
        } else {
            this.updateSaveToHubStatus('Hub não disponível - certifique-se de que o Knowledge Hub esteja rodando', 'warning');
        }
    }

    updateSaveToHubStatus(message, type) {
        const hubStatus = document.getElementById('hubStatus');
        if (!hubStatus) return;

        hubStatus.textContent = message;
        hubStatus.className = `hub-status ${type}`;
    }

    focusModal(modal) {
        // Focus first focusable element
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }

    cleanupModal(modal) {
        switch (this.activeModal) {
            case 'preview':
                const previewFrame = modal.querySelector('#previewFrame');
                if (previewFrame) {
                    previewFrame.srcdoc = '';
                }
                break;
            case 'saveToHub':
                this.updateSaveToHubStatus('', 'info');
                break;
        }
    }

    // Public API
    isModalOpen() {
        return this.activeModal !== null;
    }

    getActiveModal() {
        return this.activeModal;
    }

    // Utility methods
    downloadFile(filename, content, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.style.display = 'none';
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
        
        this.showNotification(`Arquivo "${filename}" baixado!`, 'success');
    }

    sanitizeFilename(filename) {
        return filename
            .replace(/[<>:"/\\|?*]/g, '_')
            .replace(/\s+/g, '-')
            .toLowerCase();
    }

    showNotification(message, type) {
        if (window.htmlBuilderApp && window.htmlBuilderApp.showNotification) {
            window.htmlBuilderApp.showNotification(message, type);
        } else {
            console.log(`[${type.toUpperCase()}] ${message}`);
        }
    }

    // Animation utilities
    animateModalIn(modal) {
        modal.style.transform = 'scale(0.9)';
        modal.style.opacity = '0';
        
        requestAnimationFrame(() => {
            modal.style.transition = 'all 0.3s ease';
            modal.style.transform = 'scale(1)';
            modal.style.opacity = '1';
        });
    }

    animateModalOut(modal) {
        modal.style.transition = 'all 0.2s ease';
        modal.style.transform = 'scale(0.9)';
        modal.style.opacity = '0';
        
        setTimeout(() => {
            modal.style.display = 'none';
            modal.style.transform = '';
            modal.style.opacity = '';
            modal.style.transition = '';
        }, 200);
    }
}

// Add modal styles
const modalStyles = `
<style>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.2s ease-out;
}

.modal {
    position: relative;
    background: white;
    border-radius: 12px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    max-width: 90vw;
    max-height: 90vh;
    overflow: hidden;
    display: none;
    animation: modalSlideIn 0.3s ease-out;
}

.modal.show {
    display: flex;
    flex-direction: column;
}

.modal-large {
    width: 90vw;
    height: 90vh;
}

.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    border-bottom: 1px solid #e2e8f0;
    background: #f8fafc;
}

.modal-header h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: #1e293b;
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #64748b;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 0.375rem;
    transition: all 0.2s ease;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-close:hover {
    background: #e2e8f0;
    color: #1e293b;
}

.modal-body {
    padding: 1.5rem;
    flex: 1;
    overflow-y: auto;
}

.modal-footer {
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
    padding: 1.5rem;
    border-top: 1px solid #e2e8f0;
    background: #f8fafc;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes modalSlideIn {
    from { 
        opacity: 0;
        transform: scale(0.95) translateY(-20px);
    }
    to { 
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.export-options {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 0.5rem;
    border: 1px solid #e2e8f0;
}

.export-options label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.875rem;
    color: #1e293b;
}

#previewFrame {
    width: 100%;
    height: calc(90vh - 140px);
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    background: white;
}

.hub-status {
    margin-top: 1rem;
    padding: 0.75rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
}

.hub-status.info {
    background: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
    border: 1px solid rgba(59, 130, 246, 0.2);
}

.hub-status.success {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
    border: 1px solid rgba(16, 185, 129, 0.2);
}

.hub-status.error {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    border: 1px solid rgba(239, 68, 68, 0.2);
}

.hub-status.warning {
    background: rgba(245, 158, 11, 0.1);
    color: #f59e0b;
    border: 1px solid rgba(245, 158, 11, 0.2);
}

@media (max-width: 768px) {
    .modal {
        width: 95vw;
        height: 95vh;
    }
    
    .modal-header,
    .modal-body,
    .modal-footer {
        padding: 1rem;
    }
    
    .export-options {
        flex-direction: column;
        gap: 0.5rem;
    }
}
</style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', modalStyles);

// Export for global access
window.ModalManager = ModalManager;