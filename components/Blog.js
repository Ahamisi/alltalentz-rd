"use client"
import React, { useEffect, useState } from 'react';
import Parser from 'rss-parser';
import cheerio from 'cheerio';

const Blog = () => {
  const [posts, setPosts] = useState([]);


  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const parser = new Parser();
  //     const feed = await parser.parseURL('https://ubernation.substack.com/feed');
      
  //     const postsWithImages = await Promise.all(
  //       feed.items.map(async (item) => {
  //         const { content } = await parser.parseString(item['content:encoded']);
  //         const $ = cheerio.load(content);
  //         const firstImage = $('img').attr('src');
  //         return { ...item, firstImage };
  //       })
  //     );

  //     setPosts(postsWithImages);
  //   };

  //   fetchPosts();
  // }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/substack');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPosts();
  }, []);



  return (
    <section className="py-10">
      <div className="container px-[15px] md:mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">



        {posts.map((post) => (
           <div className="shadow-md rounded-[35px] rounded-tl-none rounded-br-none bg-white">
              <div className="mb-4">
              {post.firstImage && <img src={post.firstImage} alt={post.title} className="w-full h-auto " />}

                 
              </div>
              <div className='p-[27px]'>
              <h3 className="text-lg font-semibold mb-2 text-secondary">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.contentSnippet}
                  </p>
                  <div className='text-right'>
                      <a href={post.link} className="text-secondary font-bold hover:">
                          Read More 
                          
                      </a>
                  </div>
              </div>
          </div>
        ))}


        </div>
      </div>
    </section>
  );
};

export default Blog;
