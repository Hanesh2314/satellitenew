import * as React from 'react';
import { State, ToasterToast } from '@/types';

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

type ActionType = {
  type: 'ADD_TOAST' | 'UPDATE_TOAST' | 'DISMISS_TOAST' | 'REMOVE_TOAST';
  toast?: Partial<ToasterToast>;
  toastId?: string;
};

export const listeners = new Set<(state: State) => void>();
export const memoryState: State = { toasts: [] };

function dispatch(action: ActionType) {
  memoryState.toasts = memoryState.toasts.filter(t => t.id !== action.toastId);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

export function toast(props: Omit<ToasterToast, 'id'>) {
  const id = Math.random().toString(36).substr(2, 9);

  const update = (props: ToasterToast) =>
    dispatch({
      type: 'UPDATE_TOAST',
      toast: { ...props },
      toastId: id,
    });

  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id });

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id,
    dismiss,
    update,
  };
}

export function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
  };
}
