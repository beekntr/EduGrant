const steps = [
    {
      title: "1. Student Applies",
      description:
        "Students upload their documents (grades, income proof, university ID) securely through the EduGrant platform.",
      icon: "📄", // Emoji or custom icon
    },
    {
      title: "2. Documents Verified",
      description:
        "The uploaded documents are verified by the university or government authorities (on-chain or off-chain).",
      icon: "✅",
    },
    {
      title: "3. Eligibility Check (Smart Contract)",
      description:
        "A smart contract automatically checks if the student meets the eligibility criteria and triggers payment if approved.",
      icon: "🤖",
    },
    {
      title: "4. Scholarship Disbursed",
      description:
        "Funds are transferred directly to the student's pre-verified wallet in stablecoins or tokens, ensuring fast and secure transactions.",
      icon: "💰",
    },
    {
      title: "5. Public Record",
      description:
        "Every transaction is permanently recorded on the blockchain, making it transparent and auditable by anyone.",
      icon: "🔗",
    },
  ];
  
  export default function HowEduGrantWorks() {
    return (
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        {/* Background Image */}
        <img
          alt=""
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
          className="absolute inset-0 -z-10 size-full object-cover object-right md:object-center"
        />
  
        {/* Gradient Overlay */}
        <div
          aria-hidden="true"
          className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="aspect-1097/845 w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          />
        </div>
  
        {/* Content */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
              How EduGrant Works
            </h2>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
              EduGrant simplifies scholarship distribution using blockchain
              technology. Here's how it works:
            </p>
          </div>
  
          {/* Steps Grid */}
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.title}
                className="flex flex-col rounded-2xl bg-white/10 p-8 backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/20"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{step.icon}</span>
                  <h3 className="text-2xl font-semibold text-white">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-4 text-lg text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }