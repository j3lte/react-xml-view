import React, {
  createContext,
  useContext,
  FC,
  PropsWithChildren,
  useState,
  useEffect,
  useMemo,
} from "react";

import { XmlElement } from "@rgrove/parse-xml";
import hash from "object-hash";

import { XMLViewerContextType } from "./XMLViewerContext";

type StateContextMap = {
  stateMap: Map<string, boolean>;
  setMap: (key: string, value: boolean) => void;
};

export const StateContext = createContext<StateContextMap>(null);
export const useStateContext = () => useContext(StateContext);

export const StateProvider: FC<
  PropsWithChildren<{
    context: XMLViewerContextType;
    elements: Array<XmlElement>;
  }>
> = ({ children, context, elements }) => {
  const [stateMap, setStateMap] = useState<Map<string, boolean>>(new Map());
  const setMap = (key: string, value: boolean) => {
    setStateMap((map) => {
      const newMap = new Map(map);
      newMap.set(key, value);
      return newMap;
    });
  };
  const contextHash = hash({
    elements,
    collapsibe: context.collapsible,
    collapse: context.collapseDepth,
  });

  useEffect(() => {
    setStateMap(new Map());
  }, [contextHash]);

  const stateContextValue = useMemo(() => ({ stateMap, setMap }), [stateMap]);

  return (
    <StateContext.Provider value={stateContextValue}>
      {children}
    </StateContext.Provider>
  );
};
