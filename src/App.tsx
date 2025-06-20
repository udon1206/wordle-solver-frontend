// src/App.tsx
import React, { useState, useEffect } from 'react';
import LetterGrid from './component/LetterGrid';
import PostButton from './component/Button';

const GRID_SIZE = 5;
const TOTAL_CELLS = GRID_SIZE * 6; // 5x6 に修正

type Cell = {
  letter: string;
  colorIndex: number;
};

const App: React.FC = () => {
  useEffect(() => {
    document.title = 'Wordle Solver';
  }, []);

  const [cells, setCells] = useState<Cell[]>(
    Array.from({ length: TOTAL_CELLS }, () => ({ letter: '', colorIndex: 0 }))
  );

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f8fafc',
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* タイトル */}
      <h1
        style={{
          fontSize: '2.4rem',
          fontWeight: 700,
          color: '#0078d4',
          margin: '32px 0 36px 0',
          letterSpacing: '0.04em',
          textShadow: '0 2px 8px #e3f0ff',
          textAlign: 'center',
        }}
      >
        Wordle Solver
      </h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* グリッド部分 */}
        <div
          style={{
            marginRight: '48px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            background: '#fff',
            borderRadius: '12px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <LetterGrid cells={cells} setCells={setCells} />
        </div>
        {/* ボタン＋Next Guess部分 */}
        <div
          style={{
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            background: '#fff',
            borderRadius: '12px',
            padding: '32px 32px 24px 32px',
            minWidth: '260px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* 遊び方ガイド */}
          <div
            style={{
              marginBottom: '28px',
              background: 'linear-gradient(90deg, #f3f8fd 0%, #f8fafc 100%)',
              borderRadius: '10px',
              boxShadow: '0 2px 12px rgba(0,120,212,0.06)',
              padding: '18px 24px',
              fontFamily: '"Segoe UI", "Meiryo", sans-serif',
              textAlign: 'left',
              border: '1.5px solid #d3e6f6',
              maxWidth: '340px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '10px', color: '#0078d4', letterSpacing: '0.02em' }}>
              How to play
            </div>
            <ol style={{ margin: 0, paddingLeft: '1.2em', color: '#333', fontSize: '1rem', lineHeight: 1.7 }}>
              <li>Enter your guess.</li>
              <li>Click each tile to set feedback color.</li>
              <li>Press <b>“Suggest Next Word”</b>.</li>
            </ol>
          </div>
          <PostButton cells={cells} />
        </div>
      </div>
    </div>
  );
};

export default App;
