import Parser from 'rss-parser';
import cheerio from 'cheerio';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  runtime: 'nodejs',
};

export async function GET(req, res) {

  if (req.method === 'GET') {
    try {
      const parser = new Parser();
      const feed = await parser.parseURL('https://alltalentz.substack.com/feed');

      const postsWithImages = await Promise.all(
        feed.items.map(async (item) => {
          const { content } = await parser.parseString(item['content:encoded']);
          const $ = cheerio.load(content);
          const firstImage = $('img').attr('src');
          return { ...item, firstImage };
        })
      );
      console.log(postsWithImages)

    //   return res.status(200).json(postsWithImages);
    } catch (error) {
      console.error('Error fetching RSS feed:', error);
    //   return res.status(500).json({ message: 'An error occurred while fetching the RSS feed' });
    }
  } else {
    console.log('Method not allowed')
    // return res.status(405).json({ message: 'Method Not Allowed' });
  }
}