import React from "react";

/** 同 usePersist，会等待 fn 执行完成后才会执行，禁止并发 */
export function usePersistMutex<T extends (...args: any[]) => Promise<any>>(fn: T) {
  const isLock = React.useRef(false);
  const ref = React.useRef<T>(fn);

  React.useEffect(() => {
    ref.current = fn;
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>> | undefined> => {
    if (isLock.current === false) {
      try {
        isLock.current = true;
        return await ref.current(...args);
      } finally {
        isLock.current = false;
      }
    }
    return undefined;
  }, []);
}
