import React from 'react';
import { useParallelUniverseExplorer } from './hooks/useParallelUniverseExplorer';
import { UniverseBrowserView } from './components/UniverseBrowserView';
import { UniverseMainView } from './components/UniverseMainView';

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
      <UniverseBrowserView
        onSelectUniverse={selectUniverse}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        history={history}
        onHideBrowser={handleHideBrowser}
      />
    );
  }

  return (
    <UniverseMainView
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