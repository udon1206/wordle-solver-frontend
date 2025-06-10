// src/LetterGrid.tsx
import React, { useEffect } from 'react';

const GRID_SIZE = 5;
const ROWS = 6; // 6行
const COLORS = ['#ffffff', '#787c7e', '#c9b458', '#6aaa64'] as const;

type Cell = {
    letter: string;
    colorIndex: number;
};

interface LetterGridProps {
    cells: Cell[];
    setCells: React.Dispatch<React.SetStateAction<Cell[]>>;
}

const LetterGrid: React.FC<LetterGridProps> = ({ cells, setCells }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key;

            // Backspace : 最後に入力されたセルを空文字にする
            if (key === 'Backspace') {
                setCells(prev => {
                    const lastIdx = prev
                        .map((cell, idx) => ({ cell, idx }))
                        .filter(({ cell }) => cell.letter !== '')
                        .map(({ idx }) => idx)
                        .pop() ?? -1;
                    if (lastIdx === -1) return prev;
                    const next = [...prev];
                    next[lastIdx] = { ...next[lastIdx], letter: '' };
                    return next;
                });
                return;
            }

            // A～Z／a～z の入力なら、先頭の空セルに大文字をセット
            if (key.length === 1 && /^[a-zA-Z]$/.test(key)) {
                setCells(prev => {
                    const idx = prev.findIndex(cell => cell.letter === '');
                    if (idx === -1) return prev;
                    const next = [...prev];
                    next[idx] = { ...next[idx], letter: key.toUpperCase() };
                    return next;
                });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [setCells]);

    // クリックで色を「white→gray→yellow→green→white...」とサイクル
    const handleCellClick = (index: number) => {
        setCells(prev => {
            const next = [...prev];
            const c = next[index];
            next[index] = {
                ...c,
                colorIndex: (c.colorIndex + 1) % COLORS.length,
            };
            return next;
        });
    };

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${GRID_SIZE}, 50px)`,
                gridTemplateRows: `repeat(${ROWS}, 50px)`, // 6行
                gap: '5px',
            }}
        >
            {cells.map((cell, i) => (
                <div
                    key={i}
                    onClick={() => handleCellClick(i)}
                    style={{
                        width: '50px',
                        height: '50px',
                        border: '1px solid #d3d6da', // 枠の色を指定
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS[cell.colorIndex],
                        userSelect: 'none',
                        fontSize: '1.2rem',
                        fontWeight: 700, // 文字を太く
                        color: cell.colorIndex === 0 ? '#222' : '#fff', // 白背景なら濃いグレー、それ以外は白
                        cursor: 'pointer',
                    }}
                >
                    {cell.letter}
                </div>
            ))}
        </div>
    );
};

export default LetterGrid;
