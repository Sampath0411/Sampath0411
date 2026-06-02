import { useState } from "react";

export function NowPlaying() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-30">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 rounded-full bg-card border border-border px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors shadow-lg"
      >
        <div className="flex items-end gap-[2px] h-3">
          <span className="music-bar" />
          <span className="music-bar" />
          <span className="music-bar" />
          <span className="music-bar" />
        </div>
        <span className="hidden sm:inline">Now Playing</span>
      </button>
      {expanded && (
        <div className="absolute bottom-12 left-0 rounded-xl bg-card border border-border p-4 shadow-xl w-64">
          <p className="text-xs font-mono text-accent-blue mb-1">🎧 Listening</p>
          <p className="text-sm font-medium">Lo-Fi Coding Playlist</p>
          <p className="text-xs text-muted-foreground mt-1">Spotify · 24/7 chill beats</p>
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs font-mono text-accent-blue mb-1">📖 Reading</p>
            <p className="text-sm font-medium">Clean Code</p>
            <p className="text-xs text-muted-foreground mt-1">Robert C. Martin</p>
          </div>
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs font-mono text-accent-blue mb-1">🔧 Learning</p>
            <p className="text-sm font-medium">Docker & Kubernetes</p>
            <p className="text-xs text-muted-foreground mt-1">In progress...</p>
          </div>
        </div>
      )}
    </div>
  );
}
