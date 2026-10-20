import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  X, 
  BookOpen, 
  Layers, 
  Search, 
  Eye, 
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { PDF_DOCUMENTS } from '../data/sdkData';
import { PdfDocument } from '../types/sdk';

interface PdfViewerModalProps {
  initialDocumentId?: string;
  onClose?: () => void;
  isModal?: boolean;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  initialDocumentId = 'api-reference',
  onClose,
  isModal = false,
}) => {
  const [selectedDocId, setSelectedDocId] = useState<string>(initialDocumentId);
  const [searchFilter, setSearchFilter] = useState<string>('');

  const selectedDoc = PDF_DOCUMENTS.find((d) => d.id === selectedDocId) || PDF_DOCUMENTS[0];

  const filteredDocs = PDF_DOCUMENTS.filter((doc) =>
    doc.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const content = (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              Payment Device SDK 5.4.1 Official Release PDFs
            </h3>
            <p className="text-xs text-slate-400">
              7 bundled release manuals, specifications, and architecture supplements
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={selectedDoc.downloadUrl}
            download={selectedDoc.fileName}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/20 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </a>

          {isModal && onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
        
        {/* Left Document List Sidebar */}
        <div className="lg:col-span-4 border-r border-slate-800 flex flex-col bg-slate-950/60 p-4 space-y-3 overflow-y-auto max-h-[800px]">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search PDF documents..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-2">
            {filteredDocs.map((doc) => {
              const isCurrent = doc.id === selectedDoc.id;
              return (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  className={`w-full text-left p-3 rounded-xl border transition flex flex-col justify-between cursor-pointer ${
                    isCurrent
                      ? 'bg-cyan-950/70 border-cyan-500/60 text-white shadow-md'
                      : 'bg-slate-900/90 border-slate-800/80 text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-xs line-clamp-2">{doc.title}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 shrink-0">
                      {doc.pages} pgs
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {doc.description}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span className="px-1.5 py-0.2 rounded bg-slate-800 text-cyan-300">{doc.category}</span>
                    <span>{doc.size}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Embedded PDF Viewer Area */}
        <div className="lg:col-span-8 flex flex-col bg-slate-950 h-full min-h-[500px] lg:min-h-[750px]">
          
          {/* Document metadata banner */}
          <div className="px-5 py-2.5 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 truncate">
              <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="font-bold text-white truncate">{selectedDoc.fileName}</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono shrink-0">
              <span>{selectedDoc.pages} Pages</span>
              <span>•</span>
              <span>{selectedDoc.size}</span>
              <a
                href={selectedDoc.downloadUrl}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1 font-sans"
              >
                <span>New Tab</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Embedded PDF iframe */}
          <div className="flex-1 w-full bg-slate-900 relative">
            <iframe
              src={`${selectedDoc.downloadUrl}#toolbar=1&navpanes=1`}
              title={selectedDoc.title}
              className="w-full h-full border-0 absolute inset-0"
            />
          </div>

        </div>

      </div>

    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
        <div className="w-full max-w-6xl h-[90vh]">
          {content}
        </div>
      </div>
    );
  }

  return content;
};
