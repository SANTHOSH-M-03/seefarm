import React from "react";
import { Link } from "react-router-dom";
import CowImage from "../assets/Cow.jpeg";

function Home() {
  return (
    <div className="w-full overflow-hidden">
      {/* Full Page Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden" style={{
        backgroundImage: `linear-gradient(135deg, rgba(20, 40, 70, 0.35) 0%, rgba(15, 35, 65, 0.40) 100%), url(${CowImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        {/* Animated Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-15 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-orange-400 rounded-full blur-3xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-yellow-400 rounded-full blur-3xl opacity-8 animate-pulse" style={{animationDelay: '2s'}}></div>

        <div className="relative max-w-6xl mx-auto px-6 text-center z-10">
          <div className="animate-fade-in space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-tight">
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-yellow-300 to-orange-300 drop-shadow-2xl">
                  Welcome to
                </span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-orange-300 via-yellow-300 to-yellow-200 drop-shadow-2xl mt-4">
                  Mr.Sea Farm
                </span>
              </h1>
            </div>

            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/95 leading-relaxed drop-shadow-lg font-light">
              🌾 Fresh <span className="font-semibold text-yellow-200">organic milk</span> • 🐔 Free-range <span className="font-semibold text-yellow-200">country chicken</span> • ♻️ Pure <span className="font-semibold text-yellow-200">cow dung</span> • 🌿 Traditional <span className="font-semibold text-yellow-200">Panjakaviyam</span>
            </p>

            <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/85 leading-relaxed drop-shadow-lg">
              Experience <strong>nature's purity</strong> delivered straight from our fields to your home
            </p>

            <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/products"
                className="inline-block relative group"
              >
                <div className="absolute inset-0 bg-orange-500 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold text-lg py-5 px-12 rounded-full shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2 border-2 border-orange-300 hover:shadow-3xl">
                  🛒 Shop Now
                </div>
              </Link>

              <Link
                to="/about"
                className="inline-block relative group"
              >
                <div className="absolute inset-0 bg-white/40 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white/25 backdrop-blur-md text-white font-bold text-lg py-5 px-12 rounded-full shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2 border-2 border-white/60 hover:bg-white/35">
                  Learn More →
                </div>
              </Link>

              <Link
                to="/contact"
                className="inline-block relative group"
              >
                <div className="absolute inset-0 bg-green-500/40 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-green-500/30 backdrop-blur-md text-white font-bold text-lg py-5 px-12 rounded-full shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2 border-2 border-green-400/60 hover:bg-green-500/40">
                  📞 Contact Us
                </div>
              </Link>
            </div>

            <div className="mt-20 flex justify-center gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-300">100%</div>
                <div className="text-white/80 mt-2">Organic</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-300">Fresh</div>
                <div className="text-white/80 mt-2">Farm to Home</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-300">Natural</div>
                <div className="text-white/80 mt-2">No Chemicals</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 mb-16">
            Why Choose Mr.Sea Farm?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🌱"
              title="100% Organic"
              desc="No chemicals, no pesticides, no artificial additives. Pure nature in every product."
            />
            <FeatureCard
              icon="🚜"
              title="Traditional Farming"
              desc="Sustainable practices passed down through generations for optimal quality."
            />
            <FeatureCard
              icon="🏡"
              title="Farm to Home"
              desc="Fresh delivery straight from our farm to your doorstep, maintaining purity."
            />
            <FeatureCard
              icon="🐄"
              title="Healthy Animals"
              desc="Free-range, naturally raised animals fed with organic feed and natural care."
            />
            <FeatureCard
              icon="✨"
              title="Premium Quality"
              desc="Every product is carefully selected and tested for maximum quality assurance."
            />
            <FeatureCard
              icon="💚"
              title="Eco-Friendly"
              desc="Environmentally responsible farming that protects nature for future generations."
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-white to-orange-50 p-10 md:p-16 rounded-3xl shadow-2xl border-2 border-orange-200 hover:shadow-3xl transition-all duration-500">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-yellow-600 mb-8 text-center">
              About Our Farm
            </h2>

            <p className="text-gray-800 text-lg leading-relaxed mb-6">
              At <strong className="text-orange-600">Mr.Sea Farm</strong>, we follow traditional and sustainable farming methods. 
              Our cows graze freely on chemical-free pastures, our chickens roam naturally on the farm, 
              and every product is grown and processed without artificial additives or harmful chemicals.
            </p>

            <p className="text-gray-800 text-lg leading-relaxed mb-8">
              We care deeply about the soil, the animals, and most importantly, your family's health. 
              Each product represents our commitment to excellence and purity. When you choose Mr.Sea Farm, 
              you're investing in your family's wellness.
            </p>

            <div className="text-center">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 px-8 rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                Discover Our Story
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-24 px-6 bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 mb-4">
            Our Premium Products
          </h2>
          <p className="text-center text-slate-600 text-lg mb-16 font-medium">
            Fresh, Pure, and Delivered with Care
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <ProductPreview
              icon="🥛"
              name="Organic Milk"
              desc="Pure A2 milk from grass-fed cows"
            />
            <ProductPreview
              icon="🐔"
              name="Country Chicken"
              desc="Free-range, naturally raised"
            />
            <ProductPreview
              icon="♻️"
              name="Cow Dung"
              desc="Natural fertilizer and fuel"
            />
            <ProductPreview
              icon="🌿"
              name="Panjakaviyam"
              desc="Traditional 5-herb health mix"
            />
          </div>

          <div className="text-center">
            <Link
              to="/products"
              className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg py-4 px-10 rounded-full shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105"
            >
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-700 via-green-800 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Nature's Purity?
          </h2>
          <p className="text-lg mb-10 opacity-90">
            Join thousands of families choosing organic, natural products from Mr.Sea Farm
          </p>
          <Link
            to="/contact"
            className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 px-10 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
          >
            Get in Touch Today
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border border-slate-600 group">
      <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-300 leading-relaxed">{desc}</p>
    </div>
  );
}

function ProductPreview({ icon, name, desc }) {
  return (
    <div className="bg-gradient-to-br from-white to-orange-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-orange-200 group">
      <div className="text-6xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-xl font-bold text-slate-800 mb-2 text-center">{name}</h3>
      <p className="text-sm text-slate-600 text-center leading-relaxed">{desc}</p>
    </div>
  );
}

export default Home;