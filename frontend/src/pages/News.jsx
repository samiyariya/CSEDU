import NewsCard from '../components/NewsCard';
import { sampleNews } from '../assets/assets';

const News = () => {
  return (
    <div className="m-14 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-xl font-semibold mb-6 text-primary">Notice Board</h1>
      <div className="w-full flex flex-wrap gap-8 pt-6 gap-y-14">
        {sampleNews.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>
    </div>
  );
};

export default News;