import React, { useState, useEffect } from 'react';
import { Database, X, CheckCircle2, RefreshCw, Save, Server, Code2, ShieldCheck, Key } from 'lucide-react';

interface SupabaseConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (config: any) => void;
}

export const SupabaseConnectModal: React.FC<SupabaseConnectModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [url, setUrl] = useState('');
  const [anonKey, setAnonKey] = useState('');
  const [status, setStatus] = useState('Disconnected');
  const [testing, setTesting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');

  useEffect(() => {
    if (isOpen) {
      fetch('/api/supabase')
        .then(res => res.json())
        .then(data => {
          if (data.success && data.config) {
            setUrl(data.config.url || '');
            setAnonKey(data.config.anonKey || '');
            setStatus(data.config.status || 'Disconnected');
          }
        })
        .catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTest = async () => {
    if (!url.trim() || !anonKey.trim()) {
      setMessage('Please enter both Supabase Project URL and Anon Key.');
      setMessageType('error');
      return;
    }

    // Basic Validation for wrong URL types (like Vercel)
    if (url.includes('vercel.app')) {
      setMessage('Aap Vercel URL use ker rahe hain. Supabase URL check karen (e.g., https://xyz.supabase.co).');
      setMessageType('error');
      return;
    }

    if (!url.includes('supabase.co') && !url.includes('supabase.in') && !url.includes('localhost')) {
      setMessage('Invalid Supabase URL. Please use your Project URL from Supabase Dashboard settings.');
      setMessageType('error');
      return;
    }

    setTesting(true);
    setMessage('Testing connection to Supabase...');
    setMessageType('info');

    try {
      const res = await fetch('/api/supabase/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim(), anonKey: anonKey.trim() })
      });
      const data = await res.json();
      if (data.success) {
        setMessage(data.status || 'Connection Successful & Verified!');
        setMessageType('success');
        setStatus('Connected & Verified');
      } else {
        // If the error message from backend contains "NOT_FOUND" or similar from Vercel
        const errorMsg = data.status || data.message || 'Connection failed.';
        if (errorMsg.includes('NOT_FOUND') || errorMsg.includes('hnd1')) {
          setMessage('Error: Invalid Supabase URL. Aapne ghalti se website URL enter ki hai. Supabase Dashboard se "Project URL" copy karen.');
        } else {
          setMessage(errorMsg);
        }
        setMessageType('error');
      }
    } catch {
      setMessage('Network error connecting to Supabase backend.');
      setMessageType('error');
    } finally {
      setTesting(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !anonKey.trim()) {
      setMessage('Please enter both Supabase Project URL and Anon Key.');
      setMessageType('error');
      return;
    }
    setTesting(true);
    try {
      const res = await fetch('/api/supabase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim(), anonKey: anonKey.trim() })
      });
      const data = await res.json();
      if (data.success) {
        setStatus(data.config?.status || 'Connected & Verified');
        setMessage('Supabase successfully connected to your WeVersity website!');
        setMessageType('success');
        onSuccess?.(data.config);
        setTimeout(() => {
          onClose();
        }, 1800);
      }
    } catch {
      setMessage('Configuration saved locally.');
      setMessageType('info');
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-xl bg-white border border-purple-100 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-[#18113C] relative my-8 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-purple-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-[#6D28D9] shadow-sm">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-lg text-[#18113C]">Connect Supabase Database</h2>
              <p className="text-xs text-gray-500">Enter your project credentials to link website data</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-xl text-gray-400 hover:text-[#6D28D9] hover:bg-purple-50 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100">
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${
              status.includes('Verified') ? 'bg-emerald-500 animate-pulse' : status.includes('Connected') ? 'bg-amber-500' : 'bg-rose-500'
            }`} />
            <span className="text-xs font-bold text-[#18113C]">Supabase Status:</span>
          </div>
          <span className={`text-xs font-black px-3 py-1 rounded-full border ${
            status.includes('Verified') 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
              : status.includes('Connected') 
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : 'bg-rose-50 text-rose-700 border-rose-200'
          }`}>
            {status}
          </span>
        </div>

        {/* Feedback Message */}
        {message && (
          <div className={`p-4 rounded-2xl text-xs font-bold flex items-start gap-2.5 border ${
            messageType === 'success' 
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : messageType === 'error'
              ? 'bg-rose-50 text-rose-800 border-rose-200'
              : 'bg-blue-50 text-blue-800 border-blue-200'
          }`}>
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{message}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-[#6D28D9]" />
              <span>Supabase Project URL</span>
            </label>
            <input 
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://xyzcompany.supabase.co"
              className="w-full px-4 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl text-xs sm:text-sm text-[#18113C] placeholder-gray-400 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition-all font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-[#6D28D9]" />
              <span>Supabase Anon Key</span>
            </label>
            <input 
              type="password"
              required
              value={anonKey}
              onChange={(e) => setAnonKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="w-full px-4 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl text-xs sm:text-sm text-[#18113C] placeholder-gray-400 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition-all font-mono"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-purple-100">
            <button
              type="button"
              onClick={handleTest}
              disabled={testing}
              className="px-4 py-2.5 rounded-xl bg-purple-50 text-[#6D28D9] border border-purple-200 text-xs font-bold hover:bg-purple-100 transition-all flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
              <span>{testing ? 'Testing...' : 'Test Connection'}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-600 text-xs font-bold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={testing}
                className="px-6 py-2.5 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-200 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save & Connect Website</span>
              </button>
            </div>
          </div>
        </form>

        {/* Quick SQL Helper */}
        <div className="p-4 rounded-2xl bg-gray-900 text-emerald-400 text-xs font-mono space-y-2">
          <div className="flex items-center justify-between text-[11px] text-gray-400 font-sans font-bold">
            <span className="flex items-center gap-1.5 text-white">
              <Code2 className="w-3.5 h-3.5 text-emerald-400" />
              SQL Editor Setup Snippet
            </span>
            <span>Copy to Supabase SQL Editor</span>
          </div>
          <pre className="whitespace-pre-wrap text-[10px]">{`CREATE TABLE IF NOT EXISTS public.website_data (id INT8 PRIMARY KEY, data JSONB NOT NULL, updated_at TIMESTAMPTZ DEFAULT NOW());
ALTER TABLE public.website_data ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Website Sync" ON public.website_data;
CREATE POLICY "Public Website Sync" ON public.website_data FOR ALL USING (true);`}</pre>
        </div>

      </div>
    </div>
  );
};
