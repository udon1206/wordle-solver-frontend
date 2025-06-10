import * as React from 'react';
import { Button } from '@fluentui/react-components';

type Cell = {
    letter: string;
    colorIndex: number;
};

interface PostButtonProps {
    cells: Cell[];
}

const colorIndexToStatus = (colorIndex: number) => {
    // 0: white, 1: gray, 2: yellow, 3: green
    // whiteは未入力扱いで'0'、gray=0, yellow=2, green=1 などAPI仕様に合わせて調整
    // ここでは gray=0, yellow=1, green=2, white=0 と仮定
    switch (colorIndex) {
        case 1: return '0'; // gray
        case 2: return '1'; // yellow
        case 3: return '2'; // green
        default: return '3'; // white or unknown
    }
};

const PostButton: React.FC<PostButtonProps> = ({ cells }) => {
    const [nextGuess, setNextGuess] = React.useState<string | null>(null);
    const handleClick = async () => {
        setNextGuess(null); // ボタン押下時に一旦消す
        // 5文字ごとに分割
        const rows = [];
        const statuses = [];
        for (let i = 0; i < cells.length; i += 5) {
            const row = cells.slice(i, i + 5);
            if (row.some(cell => cell.letter === '')) continue; // 空欄があればスキップ
            rows.push(row.map(cell => cell.letter.toLowerCase()).join(''));
            statuses.push(row.map(cell => colorIndexToStatus(cell.colorIndex)).join(''));
        }
        const body = {
            answer_strings: rows,
            answer_statuses: statuses,
        };
        const response = await fetch('https://wordle-solver-7fyx.onrender.com/next_guess', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        const json = await response.json();
        setNextGuess(json.next_guess || null);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{
                marginBottom: '0px',
                marginLeft: '-32px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '48px',
            }}>
                <span style={{
                    fontSize: '1.2rem',
                    color: '#888',
                    marginBottom: '4px',
                    letterSpacing: '0.05em',
                }}>
                    Suggested Word:
                </span>
                <span style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: nextGuess ? '#0078d4' : '#bbb',
                    background: nextGuess ? '#e6f4ff' : 'transparent',
                    borderRadius: '8px',
                    padding: nextGuess ? '8px 24px' : '8px 24px',
                    minWidth: '120px',
                    transition: 'background 0.2s, color 0.2s',
                    boxShadow: nextGuess ? '0 2px 8px rgba(0,120,212,0.08)' : 'none',
                }}>
                    {nextGuess ?? ''}
                </span>
            </div>
            <div style={{
                marginTop: '40px',
                marginLeft: '-32px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '48px',
            }}>
                <Button appearance="primary" onClick={handleClick}>
                    Suggest Next Word
                </Button>
            </div>
        </div>
    );
};

export default PostButton;
