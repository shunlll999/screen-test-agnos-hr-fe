"use client";

import { useCallback, useLayoutEffect, useRef } from "react";

// FLIP technique: จำตำแหน่งเดิมของแต่ละ card ไว้ พอ list เปลี่ยน
// card เก่าจะ slide จากตำแหน่งเดิมไปตำแหน่งใหม่ ส่วน card ที่เพิ่ง spawn จะ pop เข้ามา
export const useFlipAnimation = (dep: unknown) => {
  const itemsRef = useRef(new Map<string, HTMLElement>());
  const prevRects = useRef(new Map<string, DOMRect>());
  const isFirstRun = useRef(true);

  const setItemRef = useCallback((key: string) => (el: HTMLElement | null) => {
    if (el) itemsRef.current.set(key, el);
    else itemsRef.current.delete(key);
  }, []);

  useLayoutEffect(() => {
    const items = itemsRef.current;
    const prev = prevRects.current;

    // อ่านตำแหน่งใหม่ทั้งหมดก่อน ค่อยเริ่ม animate ทีหลัง
    const newRects = new Map<string, DOMRect>();
    items.forEach((el, key) => newRects.set(key, el.getBoundingClientRect()));

    if (!isFirstRun.current) {
      items.forEach((el, key) => {
        const newRect = newRects.get(key)!;
        const oldRect = prev.get(key);

        if (oldRect) {
          const dx = oldRect.left - newRect.left;
          const dy = oldRect.top - newRect.top;
          if (dx || dy) {
            el.animate(
              [
                { transform: `translate(${dx}px, ${dy}px)` },
                { transform: "translate(0, 0)" },
              ],
              { duration: 450, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
            );
          }
        } else {
          el.animate(
            [
              { opacity: 0, transform: "scale(0.85) translateY(-10px)" },
              { opacity: 1, transform: "scale(1) translateY(0)" },
            ],
            { duration: 450, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
          );
        }
      });
    }

    isFirstRun.current = false;
    prevRects.current = newRects;
  }, [dep]);

  return setItemRef;
};
