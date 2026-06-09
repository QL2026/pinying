import { useState, useRef, useEffect, useCallback } from 'react';

export interface UseRecorderResult {
  isRecording: boolean;
  audioUrl: string | null;
  duration: number;
  permissionStatus: 'prompt' | 'granted' | 'denied' | 'checking';
  error: string | null;
  startRecording: () => Promise<boolean>;
  stopRecording: () => void;
  clearRecording: () => void;
  requestPermission: () => Promise<boolean>;
}

export function useRecorder(): UseRecorderResult {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [permissionStatus, setPermissionStatus] = useState<'prompt' | 'granted' | 'denied' | 'checking'>('checking');
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Check initial permission status if the API is available
  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.permissions) {
      setPermissionStatus('prompt');
      return;
    }

    navigator.permissions
      .query({ name: 'microphone' as PermissionName })
      .then((permissionObj) => {
        setPermissionStatus(permissionObj.state as any);
        permissionObj.onchange = () => {
          setPermissionStatus(permissionObj.state as any);
        };
      })
      .catch(() => {
        // Fallback for browsers that don't support permissions query for mic (e.g. Safari)
        setPermissionStatus('prompt');
      });
  }, []);

  // Request explicit permission
  const requestPermission = useCallback(async (): Promise<boolean> => {
    setError(null);
    if (typeof navigator === 'undefined' || !navigator.mediaDevices) {
      setError('您使用的浏览器不支持麦克风录音功能，建议在微信或Chrome中打开。');
      setPermissionStatus('denied');
      return false;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stop the stream immediately since we're just requesting permission
      stream.getTracks().forEach((track) => track.stop());
      setPermissionStatus('granted');
      return true;
    } catch (err: any) {
      console.error('Microphone access denied:', err);
      setError('没有开启麦克风权限，无法跟读录音。请在浏览器设置中允许此网站访问麦克风。');
      setPermissionStatus('denied');
      return false;
    }
  }, []);

  // Start recording voice
  const startRecording = useCallback(async (): Promise<boolean> => {
    setError(null);
    setAudioUrl(null);
    setDuration(0);
    audioChunksRef.current = [];

    if (typeof navigator === 'undefined' || !navigator.mediaDevices) {
      setError('您的浏览器不支持录音功能。');
      return false;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Select support mime types
      let mimeType = '';
      if (MediaRecorder.isTypeSupported('audio/webm')) {
        mimeType = 'audio/webm';
      } else if (MediaRecorder.isTypeSupported('audio/ogg')) {
        mimeType = 'audio/ogg';
      } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
        mimeType = 'audio/mp4';
      }

      const options = mimeType ? { mimeType } : undefined;
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType || 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        
        // Stop stream tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
      };

      mediaRecorder.start(250); // Get chunks every 250ms
      setIsRecording(true);
      setPermissionStatus('granted');

      // Start timer
      timerRef.current = window.setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);

      return true;
    } catch (err: any) {
      console.error('Failed to start recording:', err);
      setError('启动麦克风录音失败，请确认是否允许了麦克风权限。');
      setPermissionStatus('denied');
      setIsRecording(false);
      return false;
    }
  }, []);

  // Stop recording
  const stopRecording = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    
    setIsRecording(false);
  }, []);

  // Clear recording
  const clearRecording = useCallback(() => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setDuration(0);
    setError(null);
  }, [audioUrl]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return {
    isRecording,
    audioUrl,
    duration,
    permissionStatus,
    error,
    startRecording,
    stopRecording,
    clearRecording,
    requestPermission,
  };
}
