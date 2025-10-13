import axios from 'axios';

const WIKI_API_BASE = 'https://en.wikipedia.org/w/api.php';

export const searchWikipedia = async (query) => {
  const startTime = performance.now();
  
  try {
    const response = await axios.get(WIKI_API_BASE, {
      params: {
        action: 'query',
        list: 'search',
        srsearch: query,
        format: 'json',
        origin: '*',
        srlimit: 10
      }
    });
    
    const endTime = performance.now();
    const responseTime = endTime - startTime;
    
    return {
      data: response.data.query.search,
      responseTime,
      timestamp: new Date(),
      query,
      success: true
    };
  } catch (error) {
    const endTime = performance.now();
    return {
      data: [],
      responseTime: endTime - startTime,
      timestamp: new Date(),
      query,
      success: false,
      error: error.message
    };
  }
};

export const getPageInfo = async (pageId) => {
  const startTime = performance.now();
  
  try {
    const response = await axios.get(WIKI_API_BASE, {
      params: {
        action: 'query',
        pageids: pageId,
        prop: 'info|extracts',
        exintro: true,
        explaintext: true,
        format: 'json',
        origin: '*'
      }
    });
    
    const endTime = performance.now();
    const page = response.data?.query?.pages?.[pageId];
    
    if (!page) {
      return {
        responseTime: endTime - startTime,
        timestamp: new Date(),
        success: false
      };
    }
    
    return {
      title: page.title || 'Unknown',
      size: page.length || 0,
      responseTime: endTime - startTime,
      timestamp: new Date(),
      success: true
    };
  } catch (error) {
    const endTime = performance.now();
    return {
      responseTime: endTime - startTime,
      timestamp: new Date(),
      success: false,
      error: error.message
    };
  }
};
