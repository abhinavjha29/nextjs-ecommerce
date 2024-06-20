"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import "./Home.css";
import { Product } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
const HomePage: React.FC = () => {
  const router = useRouter();
  const mainRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const productRefs = useRef<HTMLDivElement[]>([]);

  const products = [
    {
      rating: {
        rate: 3,
        count: 400,
      },
      _id: "66604c2b31163a0fcb72bbed",
      id: 7,
      title: "White Gold Plated Princess",
      price: 9.99,
      description:
        "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    },
    {
      rating: {
        rate: 4.7,
        count: 500,
      },
      _id: "66604c2b31163a0fcb72bbe9",
      id: 3,
      title: "Mens Cotton Jacket",
      price: 55.99,
      description:
        "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    },
    {
      rating: {
        rate: 3.9,
        count: 120,
      },
      _id: "66604c2b31163a0fcb72bbe7",
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    },
    {
      rating: {
        rate: 4.7,
        count: 130,
      },
      _id: "66604c2b31163a0fcb72bbf8",
      id: 18,
      title: "MBJ Women's Solid Short Sleeve Boat Neck V ",
      price: 9.85,
      description:
        "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
      category: "women's clothing",
      image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
    },
    {
      rating: {
        rate: 3.9,
        count: 70,
      },
      _id: "66604c2b31163a0fcb72bbec",
      id: 6,
      title: "Solid Gold Petite Micropave ",
      price: 168,
      description:
        "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    },
    {
      rating: {
        rate: 2.9,
        count: 250,
      },
      _id: "66604c2b31163a0fcb72bbf3",
      id: 13,
      title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
      price: 599,
      description:
        "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
      category: "electronics",
      image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });

    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    ).fromTo(
      paragraphRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 },
      "-=0.5"
    );

    // Animate product cards
    productRefs.current.forEach((productRef, index) => {
      gsap.fromTo(
        productRef,
        { opacity: 0, y: 50, scale: 0.5 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: productRef,
            start: "top center+=100",
            end: "bottom center",
            scrub: true,
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);
  const HandleBtnClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: Product
  ) => {
    e.preventDefault();
    const token = Cookies.get("token");
    if (token) {
      router.push(`/product/${product._id}`);
    } else {
      toast.error("You are not logged in plese login");
      router.replace("/login");
    }
  };
  return (
    <div className="container mt-4" ref={mainRef}>
      <header className="text-center mt-5" ref={headerRef}>
        <h1 className="display-4">Welcome to E-Commerce</h1>
      </header>
      <section className="mt-5">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <p className="lead text-center" ref={paragraphRef}>
              This is a simple example of using GSAP animations in a React
              TypeScript application with Next.js.
            </p>
          </div>
        </div>
      </section>
      <section className="mt-5">
        <div className="row">
          {products.map((product, index) => (
            <div key={index} className="col-lg-4 mb-4 h-30rem">
              <div
                ref={(el) =>
                  (productRefs.current[index] = el as HTMLDivElement)
                }
                className="card w-24rem"
              >
                <Image
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                  width={300}
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  {/* <p className="card-text">{product.description}</p> */}
                  <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      HandleBtnClick(e, product)
                    }
                    className="btn btn-primary"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
