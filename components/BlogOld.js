"use client"
import React, { useEffect, useState } from 'react';
import Parser from 'rss-parser';
import cheerio from 'cheerio';

const Blog = () => {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchPosts = async () => {
      const parser = new Parser();
      const feed = await parser.parseURL('https://ubernation.substack.com/feed');
      
      const postsWithImages = await Promise.all(
        feed.items.map(async (item) => {
          const { content } = await parser.parseString(item['content:encoded']);
          const $ = cheerio.load(content);
          const firstImage = $('img').attr('src');
          return { ...item, firstImage };
        })
      );

      setPosts(postsWithImages);
    };

    fetchPosts();
  }, []);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const parser = new Parser();
  //     const feed = await parser.parseURL('https://yournewsletter.substack.com/rss');
  //     setPosts(feed.items);
  //   };

  //   fetchPosts();
  // }, []);


  // async function fetchSubstackBlog() {
  //   try {
  //     // const response = await axios.get('https://ubernation.substack.com');
  //     const html = response.data;

  //     const $ = cheerio.load(html);

  //     const fetchedBlogPosts = [];

  //     $('.post-list-item').each((index, element) => {
  //       const title = $(element).find('.post-title').text();
  //       const excerpt = $(element).find('.post-excerpt').text();
  //       const link = $(element).find('.post-title').attr('href');

  //       fetchedBlogPosts.push({ title, excerpt, link });
  //     });

  //     setBlogPosts(fetchedBlogPosts);
  //   } catch (error) {
  //     console.error('Error fetching Substack blog:', error);
  //   }
  // }

  // useEffect(() => {
  //   fetchSubstackBlog();
  // }, []);

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




       





        {/* <div className="shadow-md rounded-[35px] rounded-tl-none rounded-br-none bg-white">
                <div className="mb-4">
                    <img
                    src='/blog-1.jpg'
                    alt=''
                    className="w-full h-auto "
                    />
                </div>
               <div className='p-[27px]'>
                <h3 className="text-lg font-semibold mb-2 text-secondary">A whole world of talent at your fingertips</h3>
                    <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et faucibus libero, 
                        nec dignissim velit. Fusce pharetra sapien ac enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et faucibus libero, 
                        nec dignissim velit. Fusce pharetra sapien ac enim
                    </p>
                    <div className='text-right'>
                        <a href={`/blog/`} className="text-secondary font-bold hover:">
                           Read More 
                            
                        </a>
                    </div>
               </div>
        </div>

        <div className="shadow-md rounded-[35px] rounded-tl-none rounded-br-none bg-white">
                <div className="mb-4">
                    <img
                    src='/blog-1.jpg'
                    alt=''
                    className="w-full h-auto "
                    />
                </div>
               <div className='p-[27px]'>
                <h3 className="text-lg font-semibold mb-2 text-secondary">A whole world of talent at your fingertips</h3>
                    <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et faucibus libero, 
                        nec dignissim velit. Fusce pharetra sapien ac enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et faucibus libero, 
                        nec dignissim velit. Fusce pharetra sapien ac enim
                    </p>
                    <div className='text-right'>
                        <a href={`/blog/`} className="text-secondary font-bold hover:">
                           Read More 
                            
                        </a>
                    </div>
               </div>
        </div>


        <div className="shadow-md rounded-[35px] rounded-tl-none rounded-br-none bg-white">
                <div className="mb-4">
                    <img
                    src='/blog-1.jpg'
                    alt=''
                    className="w-full h-auto "
                    />
                </div>
               <div className='p-[27px]'>
                <h3 className="text-lg font-semibold mb-2 text-secondary">A whole world of talent at your fingertips</h3>
                    <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et faucibus libero, 
                        nec dignissim velit. Fusce pharetra sapien ac enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et faucibus libero, 
                        nec dignissim velit. Fusce pharetra sapien ac enim
                    </p>
                    <div className='text-right'>
                        <a href={`/blog/`} className="text-secondary font-bold hover:">
                           Read More 
                            
                        </a>
                    </div>
               </div>
        </div>
        <div className="shadow-md rounded-[35px] rounded-tl-none rounded-br-none bg-white">
                <div className="mb-4">
                    <img
                    src='/blog-1.jpg'
                    alt=''
                    className="w-full h-auto "
                    />
                </div>
               <div className='p-[27px]'>
                <h3 className="text-lg font-semibold mb-2 text-secondary">A whole world of talent at your fingertips</h3>
                    <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et faucibus libero, 
                        nec dignissim velit. Fusce pharetra sapien ac enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et faucibus libero, 
                        nec dignissim velit. Fusce pharetra sapien ac enim
                    </p>
                    <div className='text-right'>
                        <a href={`/blog/`} className="text-secondary font-bold hover:">
                           Read More 
                            
                        </a>
                    </div>
               </div>
        </div> */}
          {/* {blogPosts.map((blogItem, index) => (
            <div key={index} className="bg-white p-4 rounded shadow-md">
                <div className="mb-4">
                    <img
                    src={blogItem.imageSrc}
                    alt={blogItem.title}
                    className="w-full h-auto rounded"
                    />
                </div>
                <h3 className="text-lg font-semibold mb-2">{blogItem.title}</h3>
                <p className="text-gray-600 mb-4">{blogItem.excerpt}</p>
                <a
                    href={`/blog/${blogItem.slug}`}
                    className="text-blue-600 hover:underline"
                >
                    Read more
                </a>
            </div>
          ))} */}
        </div>
      </div>
    </section>
  );
};

export default Blog;
