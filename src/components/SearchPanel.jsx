import { useState } from 'react';

const SearchPanel = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('General');

  const categories = [
    'General',
    'Science',
    'Technology',
    'Mathematics',
    'History',
    'Literature',
    'Geography',
    'Arts'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      onSearch(trimmedQuery, category);
      setQuery('');
    }
  };

  const quickSearches = [
    { query: 'Artificial Intelligence', category: 'Technology' },
    { query: 'Quantum Physics', category: 'Science' },
    { query: 'Machine Learning', category: 'Technology' },
    { query: 'Renaissance', category: 'History' }
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        <label className="font-semibold text-sm text-gray-800 flex items-center gap-2 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#d7492a">
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
          </svg>
          Recherche Wikipedia
        </label>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex: Machine Learning..."
              className="w-full border border-gray-300 rounded-lg py-2.5 px-3.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-800 transition-all hover:border-gray-400 shadow-sm"
              disabled={loading}
            />
          </div>

          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-2.5 px-3.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-800 transition-all hover:border-gray-400 shadow-sm"
              disabled={loading}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="w-full bg-orange-600 text-white py-2.5 px-4 rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm font-semibold shadow-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Recherche...</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor">
                  <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
                </svg>
                <span>Rechercher</span>
              </>
            )}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#d7492a">
            <path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z"/>
          </svg>
          Recherches rapides
        </h3>
        <div className="flex flex-wrap gap-2">
          {quickSearches.map((item, index) => (
            <button
              key={index}
              onClick={() => onSearch(item.query, item.category)}
              disabled={loading}
              className="px-3 py-1.5 text-xs font-medium bg-gray-50 text-gray-700 rounded-md hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300 disabled:opacity-50 transition-all border border-gray-200 shadow-sm"
            >
              {item.query}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
