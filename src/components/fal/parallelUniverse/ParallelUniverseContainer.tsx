import React from 'react';
import { useParallelUniverseExplorer } from './hooks/useParallelUniverseExplorer';
import { AppleUniverseBrowserView } from './components/AppleUniverseBrowserView';
import { AppleUniverseMainView } from './components/AppleUniverseMainView';

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
      <AppleUniverseBrowserView
        onSelectUniverse={selectUniverse}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        history={history}
        onHideBrowser={handleHideBrowser}
      />
    );
  }

  return (
    <AppleUniverseMainView
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