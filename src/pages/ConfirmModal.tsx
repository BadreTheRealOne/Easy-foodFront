import { useEffect } from "react";
import "./ConfirmModal.css";

type Props = {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  gifUrl?: string;          // 👈 AJOUT
  autoCloseMs?: number;     // 👈 AJOUT
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  title,
  message,
  confirmText = "Confirmer",
  cancelText = "Annuler",
  gifUrl,
  autoCloseMs,
  onConfirm,
  onCancel,
}: Props) {

  // ⏱ auto close
  useEffect(() => {
    if (!autoCloseMs) return;

    const timer = setTimeout(() => {
      onConfirm();
    }, autoCloseMs);

    return () => clearTimeout(timer);
  }, [autoCloseMs, onConfirm]);

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>{title}</h2>

        {gifUrl && (
          <img
            src={gifUrl}
            alt="success"
            style={{
              width: "120px",
              margin: "0 auto 1rem",
              display: "block",
            }}
          />
        )}

        <p>{message}</p>

        <div className="modal-actions">
          {cancelText && (
            <button className="modal-cancel" onClick={onCancel}>
              {cancelText}
            </button>
          )}
          <button className="modal-confirm" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
