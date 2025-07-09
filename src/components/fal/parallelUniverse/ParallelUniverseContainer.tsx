import React from 'react';
import { useParallelUniverseExplorer } from './hooks/useParallelUniverseExplorer';
import { Modern3DMainView } from './components/Modern3DMainView';
import { Modern3DBrowserView } from './components/Modern3DBrowserView';

export const ParallelUniverseContainer = () => {
  const {
    currentUniverse,
    isLoading,
    showBrowser,
    favorites,
    history,
    discoverRandomUniverse,
    selectUniverse,
    handleToggleFavorite,
    copyUniverseDetails,
    handleShowBrowser,
    handleHideBrowser
  } = useParallelUniverseExplorer();

  if (showBrowser) {
    return (
      <Modern3DBrowserView
        onSelectUniverse={selectUniverse}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        history={history}
        onHideBrowser={handleHideBrowser}
      />
    );
  }

  return (
    <Modern3DMainView
      currentUniverse={currentUniverse}
      isLoading={isLoading}
      favorites={favorites}
      onDiscoverUniverse={discoverRandomUniverse}
      onToggleFavorite={() => handleToggleFavorite()}
      onCopyDetails={copyUniverseDetails}
      onShowBrowser={handleShowBrowser}
    />
  );
};