"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  async function fetchSubstackBlog() {
    try {
      const response = await axios.get('https://ubernation.substack.com');
      const html = response.data;

      const $ = cheerio.load(html);

      const fetchedBlogPosts = [];

      $('.post-list-item').each((index, element) => {
        const title = $(element).find('.post-title').text();
        const excerpt = $(element).find('.post-excerpt').text();
        const link = $(element).find('.post-title').attr('href');

        fetchedBlogPosts.push({ title, excerpt, link });
      });

      setBlogPosts(fetchedBlogPosts);
    } catch (error) {
      console.error('Error fetching Substack blog:', error);
    }
  }

  useEffect(() => {
    fetchSubstackBlog();
  }, []);

  return (
    <section className="py-10">
      <div className="container px-[15px] md:mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

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
