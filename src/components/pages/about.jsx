const stats = [
  { name: 'Students Empowered', value: '10,000+' },
  { name: 'Scholarships Distributed', value: '5,000+' },
  { name: 'Blockchain Transactions', value: '50,000+' },
  { name: 'Transparency Score', value: '100%' },
];

// StatCard Component for reusability
function StatCard({ name, value }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-all duration-300">
      <dt className="text-lg font-medium text-gray-700">{name}</dt>
      <dd className="mt-2 text-4xl font-bold text-gray-900">{value}</dd>
    </div>
  );
}

export default function AboutUs() {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-white to-gray-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Section */}
        <div className="mx-auto max-w-2xl lg:mx-0 text-center lg:text-left">
          <h2 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
            About EduChain
          </h2>
          <p className="mt-6 text-lg font-medium text-gray-600 sm:text-xl">
            EduChain is revolutionizing scholarship distribution through
            blockchain technology, ensuring <strong>transparency, security, and
            accessibility</strong> for students worldwide.
          </p>
        </div>

        {/* Stats Grid */}
        <dl className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.name} name={stat.name} value={stat.value} />
          ))}
        </dl>

        {/* Call-to-Action Button */}
        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-block rounded-lg bg-indigo-500 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-indigo-600 transition-all duration-300"
            aria-label="Learn more about EduChain"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}