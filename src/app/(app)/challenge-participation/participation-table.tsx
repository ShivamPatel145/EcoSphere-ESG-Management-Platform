"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProofButton } from "@/components/shared/proof-viewer";
import { handleApprove, handleReject } from "./actions";

export function ParticipationTable({ data, isAdmin }: { data: any[], isAdmin: boolean }) {
  const [processingId, setProcessingId] = useState<string | null>(null);

  async function onApprove(id: string) {
    if (!confirm("Are you sure you want to approve this proof? XP will be awarded immediately.")) return;
    setProcessingId(id);
    const res = await handleApprove(id);
    if (!res.success) alert("Failed to approve: " + res.error);
    setProcessingId(null);
  }

  async function onReject(id: string) {
    if (!confirm("Are you sure you want to reject this proof? The employee will need to resubmit.")) return;
    setProcessingId(id);
    const res = await handleReject(id);
    if (!res.success) alert("Failed to reject: " + res.error);
    setProcessingId(null);
  }

  return (
    <div className="bg-surface rounded-xl shadow-[0_1px_2px_rgba(31,41,55,.04)] border border-line overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-canvas border-b border-line">
            <th className="px-6 py-4 font-semibold text-ink-2">Employee</th>
            <th className="px-6 py-4 font-semibold text-ink-2">Challenge</th>
            <th className="px-6 py-4 font-semibold text-ink-2 text-center">Status</th>
            <th className="px-6 py-4 font-semibold text-ink-2">Proof</th>
            {isAdmin && <th className="px-6 py-4 font-semibold text-ink-2 text-right">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-line-soft">
          {data.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-ink-2">
                No participations found. When employees join challenges, they will appear here.
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id} className="hover:bg-hover transition-colors">
                <td className="px-6 py-4 font-medium text-ink">{row.userName}</td>
                <td className="px-6 py-4">
                  <div className="text-ink font-medium">{row.challengeTitle}</div>
                  <div className="text-xs text-ink-2">{row.challengeXp} XP Reward</div>
                </td>
                <td className="px-6 py-4 text-center">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-6 py-4">
                  {row.proofUrl ? (
                    <ProofButton url={row.proofUrl} label="View Proof" />
                  ) : (
                    <span className="text-faint text-sm">Not submitted</span>
                  )}
                </td>
                {isAdmin && (
                  <td className="px-6 py-4 text-right space-x-2">
                    {row.status === "PROOF_SUBMITTED" ? (
                      <>
                        <Button 
                          size="sm" 
                          className="bg-brand-primary hover:bg-brand-primary-dark text-white"
                          disabled={processingId === row.id}
                          onClick={() => onApprove(row.id)}
                        >
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          disabled={processingId === row.id}
                          onClick={() => onReject(row.id)}
                        >
                          Reject
                        </Button>
                      </>
                    ) : row.status === "COMPLETED" ? (
                      <span className="text-xs text-ink-2">Awarded {row.xpAwarded} XP</span>
                    ) : (
                      <span className="text-xs text-faint">Waiting for proof</span>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  let bg = "bg-surface-2 text-ink-2";
  if (status === "JOINED") bg = "bg-surface-2 text-ink-2";
  if (status === "PROOF_SUBMITTED") bg = "bg-pill-amber-bg text-pill-amber-fg animate-pulse";
  if (status === "COMPLETED") bg = "bg-pill-green-bg text-pill-green-fg";
  if (status === "REJECTED") bg = "bg-pill-red-bg text-pill-red-fg";

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bg}`}>
      {status.replace("_", " ")}
    </span>
  );
}
