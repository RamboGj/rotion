import { MagnifyingGlass } from 'phosphor-react'
import { SearchBar } from '../SearchBar'
import { useState } from 'react'

export function Search() {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false)

  function onToggleSearchBar(isOpen: boolean) {
    setIsSearchBarOpen(isOpen)
  }

  return (
    <>
      <button onClick={() => onToggleSearchBar(true)} className="flex mx-5 items-center gap-2 text-rotion-100 text-sm hover:text-rotion-50">
        <MagnifyingGlass className="w-5 h-5" />
        Busca rápida
      </button>
      <SearchBar isSearchBarOpen={isSearchBarOpen} onOpenChange={onToggleSearchBar} />
    </>
  )
}
