'use client'
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import {
  Play,
  Pause,
  RotateCcw,
} from 'react-feather';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';
import { motion } from 'motion/react';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [beginIncrement, setBeginIncrement] = useState(false);

  useEffect(() => {
    if (!beginIncrement) {
      return;
    }
    const addEverySecond = window.setInterval(() => {
      setTimeElapsed(prev => (prev + 1));
    }, 1000);
    return () => window.clearInterval(addEverySecond);

  }, [beginIncrement])

  const index = timeElapsed % COLORS.length
  const selectedColor = COLORS[index];

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected =
            color.value === selectedColor.value;

          return (
            <li
              className={styles.color}
              key={index}
            >
              {isSelected && (
                <motion.div
                  className={
                    styles.selectedColorOutline
                  }
                  layout='position'
                  transition={
                    {
                      type: 'spring',
                      damping: 500,
                      stiffness: 1000
                    }
                  }
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected &&
                  styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>
                  {color.label}
                </VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={() => { setBeginIncrement(prev => !prev); setTimeElapsed(timeElapsed + 1) }}>
            {beginIncrement ? <Pause /> : <Play />}
            <VisuallyHidden>{beginIncrement ? 'Pause' : 'Play'}</VisuallyHidden>
          </button>
          <button onClick={() => { setTimeElapsed(0); setBeginIncrement(false) }}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
