export type Level = 'NOVICE' | 'APPRENTICE' | 'RIDDLER' | 'ENIGMATIST' | 'MASTER_OF_MINDS';

interface LevelBadgeProps {
  level: Level;
  size?: 'default' | 'small';
}

const levelLabel: Record<Level, string> = {
  NOVICE: 'Novice',
  APPRENTICE: 'Apprentice',
  RIDDLER: 'Riddler',
  ENIGMATIST: 'Enigmatist',
  MASTER_OF_MINDS: 'Master of Minds',
};

const levelColor: Record<Level, string> = {
  NOVICE: 'text-muted border-stroke',
  APPRENTICE: 'text-teal border-teal/40',
  RIDDLER: 'text-gold border-gold/40',
  ENIGMATIST: 'text-[#C084FC] border-[#C084FC]/40',
  MASTER_OF_MINDS: 'text-warning border-warning/40',
};

export function LevelBadge({ level, size = 'default' }: LevelBadgeProps) {
  const textSize = size === 'small' ? 'text-2xs' : 'text-xs';
  const padding = size === 'small' ? 'px-2 py-0.5' : 'px-3 py-1';
  return (
    <span
      className={`inline-flex items-center rounded-chip border font-semibold uppercase tracking-wide ${textSize} ${padding} ${levelColor[level]}`}
    >
      {levelLabel[level]}
    </span>
  );
}
