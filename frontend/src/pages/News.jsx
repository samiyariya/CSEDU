import NewsCard from '../components/NewsCard';
import { sampleNews } from '../assets/assets';

const News = () => {
  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All News</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {sampleNews.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>
    </div>
  );
};

export default News;
