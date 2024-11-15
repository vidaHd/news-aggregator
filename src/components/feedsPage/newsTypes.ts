export interface NewsApiArticleInterface {
  status: string;
  totalResults: number;
  articles: {
    source: {
      id: null | string;
      name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  }[];
}

export interface TheGuardianArticleInterface {
  status: string;
  userTier: string;
  total: number;
  startIndex: number;
  pageSize: number;
  currentPage: number;
  pages: number;
  orderBy: string;
  results: {
    id: string;
    type: string;
    sectionId: string;
    sectionName: string;
    webPublicationDate: string;
    webTitle: string;
    webUrl: string;
    apiUrl: string;
    isHosted: boolean;
    pillarId: string;
    pillarName: string;
  }[];
}

export interface NYTimesArticleInterface {
  docs: {
    abstract: string;
    web_url: string;
    snippet: string;
    lead_paragraph: string;
    print_section: string;
    print_page: string;
    source: string;
    multimedia: {
      rank: number;
      subtype: string;
      caption: string | null;
      credit: string | null;
      type: string;
      url: string;
      height: number;
      width: number;
      legacy: {
        xlarge: string;
        xlargewidth: number;
        xlargeheight: number;
      };
      subType: string;
      crop_name: string;
    }[];
    headline: {
      main: string;
      kicker: string | null;
      content_kicker: string | null;
      print_headline: string | null;
      name: string | null;
      seo: string | null;
      sub: string | null;
    };
    keywords: {
      name: string;
      value: string;
      rank: number;
      major: string;
    }[];
    pub_date: string;
    document_type: string;
    news_desk: string;
    section_name: string;
    subsection_name: string;
    byline: {
      original: string;
      person: {
        firstname: string;
        middlename: string | null;
        lastname: string;
        qualifier: string | null;
        title: string | null;
        role: string;
        organization: string;
        rank: number;
      }[];
      organization: string | null;
    };
    type_of_material: string;
    _id: string;
    word_count: number;
    uri: string;
  }[];
  meta: {
    hits: number;
    offset: number;
    time: number;
  };
}
