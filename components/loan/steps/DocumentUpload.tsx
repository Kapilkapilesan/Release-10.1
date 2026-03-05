import React from 'react';
import { Upload, AlertCircle, CheckCircle, X, Eye } from 'lucide-react';
import { DocumentPreviewModal } from '../../common/DocumentPreviewModal';
import { DOCUMENT_TYPES, REQUIRED_DOCUMENTS } from '@/constants/loan.constants';
import { LoanFormData } from '@/types/loan.types';
import { getDocumentUrl } from '@/utils/loan.utils';
import { colors } from '@/themes/colors';
import { API_BASE_URL } from '@/services/api.config';

interface DocumentUploadProps {
    formData: LoanFormData;
    onDocumentChange: (type: string, file: File | null) => void;
    showErrors?: boolean;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({ formData, onDocumentChange, showErrors }) => {
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
    const [previewType, setPreviewType] = React.useState<string>('');
    const [isSecure, setIsSecure] = React.useState<boolean>(false);

    React.useEffect(() => {
        return () => {
            if (previewUrl?.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleFileChange = (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('File size exceeds 5MB limit');
                return;
            }
        }
        onDocumentChange(type, file);
    };

    const removeFile = (type: string, e: React.MouseEvent) => {
        e.stopPropagation();
        onDocumentChange(type, null);
    };

    const openPreview = (type: string, file: File | null, existing: any, e: React.MouseEvent) => {
        e.stopPropagation();
        setPreviewType(type);
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
            setIsSecure(false);
        } else if (existing) {
            const docId = existing.id;
            if (!docId) {
                setPreviewUrl(getDocumentUrl(existing.url || existing.file_path));
                setIsSecure(false);
                return;
            }

            let endpoint = `${API_BASE_URL}/media/loan-documents/${docId}`;
            if (existing.is_from_profile) {
                const typeParam = type.toLowerCase().includes('nic') ? 'nic' : 'profile';
                endpoint = `${API_BASE_URL}/media/customers/${formData.customer}?type=${typeParam}`;
            }
            setPreviewUrl(endpoint);
            setIsSecure(true);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-1.5 h-6 bg-primary-500 rounded-full" />
                <h2 className="text-xl font-black text-text-primary uppercase tracking-tight">Upload Documents</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DOCUMENT_TYPES.map((type) => {
                    const selectedFile = formData.documents?.[type];
                    const existingDoc = [...(formData.existingDocuments || [])].reverse().find(doc => doc.type === type);
                    const isRequired = REQUIRED_DOCUMENTS.includes(type as any);
                    const hasDocument = selectedFile || existingDoc;

                    return (
                        <div
                            key={type}
                            className={`group relative border-2 border-dashed rounded-[2rem] p-8 text-center transition-all cursor-pointer overflow-hidden ${hasDocument
                                ? 'border-emerald-500/50 bg-emerald-500/5'
                                : (isRequired && showErrors)
                                    ? 'border-rose-500 bg-rose-500/10 ring-4 ring-rose-500/10 scale-[1.02]'
                                    : isRequired
                                        ? 'border-amber-500/30 bg-amber-500/5 hover:border-amber-500/50 hover:bg-amber-500/10'
                                        : 'border-border-divider/50 bg-muted-bg/20 hover:border-primary-500/40 hover:bg-primary-500/5'
                                }`}
                            onClick={() => document.getElementById(`file-${type}`)?.click()}
                        >
                            {/* Decorative background element */}
                            <div className={`absolute top-0 right-0 w-24 h-24 rounded-full -mr-12 -mt-12 blur-3xl opacity-20 transition-all duration-500 group-hover:scale-150 ${hasDocument ? 'bg-emerald-500' : isRequired ? 'bg-amber-500' : 'bg-primary-500'}`} />

                            <input
                                id={`file-${type}`}
                                type="file"
                                className="hidden"
                                accept=".jpg,.jpeg,.png,.pdf"
                                onChange={(e) => handleFileChange(type, e)}
                            />

                            {selectedFile ? (
                                <div className="space-y-4 relative z-10 animate-in zoom-in duration-300">
                                    <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/30">
                                        <CheckCircle className="w-8 h-8 text-emerald-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-text-primary uppercase tracking-widest mb-1.5">
                                            {type} {isRequired && <span className="text-rose-500 font-bold">*</span>}
                                        </p>
                                        <p className="text-[10px] text-emerald-500 font-black uppercase tracking-tighter opacity-70">Status: Selected</p>
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            type="button"
                                            onClick={(e) => openPreview(type, selectedFile, null, e)}
                                            className="text-[10px] text-text-primary font-black uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl hover:bg-emerald-500/20 transition-all flex items-center gap-2 shadow-sm"
                                        >
                                            <Eye className="w-3.5 h-3.5" />
                                            <span className="max-w-[80px] truncate">{selectedFile.name}</span>
                                        </button>
                                        <button
                                            onClick={removeFile.bind(null, type)}
                                            className="p-2 hover:bg-rose-500/20 rounded-xl text-rose-500 transition-all bg-rose-500/10 border border-rose-500/20"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ) : existingDoc ? (
                                <div className="space-y-4 relative z-10">
                                    <div className="w-14 h-14 bg-primary-500/20 rounded-2xl flex items-center justify-center mx-auto border border-primary-500/30">
                                        <CheckCircle className="w-8 h-8 text-primary-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-text-primary uppercase tracking-widest mb-1.5">
                                            {type} {isRequired && <span className="text-rose-500 font-bold">*</span>}
                                        </p>
                                        <p className="text-[10px] text-primary-500 font-black uppercase tracking-tighter opacity-70">Status: Attached</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={(e) => openPreview(type, null, existingDoc, e)}
                                            className={`text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-sm ${(existingDoc as any).is_from_profile ? 'bg-amber-500 text-white shadow-amber-500/20 hover:opacity-90' : 'bg-primary-500 text-white shadow-primary-500/20 hover:opacity-90'}`}
                                        >
                                            <Eye className="w-4 h-4" />
                                            {(existingDoc as any).is_from_profile ? 'From Profile' : 'View Document'}
                                        </button>
                                        <span className="text-[9px] text-text-muted/60 font-black uppercase tracking-[0.2em] italic">
                                            {(existingDoc as any).is_from_profile ? 'Document is from customer profile' : 'Click to replace document'}
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4 relative z-10 transition-transform group-hover:scale-105 duration-300">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto border transition-colors ${isRequired ? 'bg-amber-500/20 border-amber-500/30 text-amber-500' : 'bg-muted-bg/40 border-border-divider/50 text-text-muted/40'}`}>
                                        <Upload className={`w-8 h-8 ${(isRequired && showErrors) ? 'animate-bounce text-rose-500' : ''}`} />
                                    </div>
                                    <div>
                                        <p className={`text-xs font-black uppercase tracking-widest mb-1.5 ${(isRequired && showErrors) ? 'text-rose-500' : 'text-text-primary'}`}>
                                            {type} {isRequired && <span className="text-rose-500 font-bold">*</span>}
                                        </p>
                                        <p className={`text-[10px] font-black uppercase tracking-[0.15em] opacity-40 italic ${isRequired ? (showErrors ? 'text-rose-500 opacity-100' : 'text-amber-500/80') : 'text-text-muted'}`}>
                                            {isRequired ? (showErrors ? 'MISSING REQUIRED DOCUMENT' : 'Required') : 'Click to upload'}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Preview Modal */}
            {previewUrl && (
                <DocumentPreviewModal
                    url={previewUrl}
                    type={previewType}
                    onClose={() => setPreviewUrl(null)}
                    isSecure={isSecure}
                />
            )}
        </div>
    );
};
