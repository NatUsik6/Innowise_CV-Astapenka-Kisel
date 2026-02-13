export const getWrapperSx = (readonly: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    cursor: readonly ? 'default' : 'pointer',
    userSelect: 'none',
    '&:hover .proficiency-level': readonly
        ? {}
        : {
            opacity: 0.7,
        },
});

export const proficiencyLevelSx = (color: string) => ({
    color,
    fontWeight: 600,
    fontSize: '1rem',
    minWidth: 50,
    flexShrink: 0,
    transition: 'opacity .2s',
});

export const languageNameSx = {
    color: 'rgba(255,255,255,0.65)',
    whiteSpace: 'nowrap',
    fontSize: '1rem',
};
