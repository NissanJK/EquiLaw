
const FAQs = () => {
    const faqs = [
        {
            question: "Are application fee waivers available?",
            answer: "Yes, we offer fee waivers for individuals who qualify based on their financial situation. Please contact our office for more details."
        },
        {
            question: "How do I schedule a consultation?",
            answer: "You can schedule a consultation by filling out our contact form or calling our office directly. We’ll work to find a convenient time."
        },
        {
            question: "What should I bring to my first legal consultation?",
            answer: "For your initial consultation, please bring relevant documentation, such as contracts, court documents, or correspondence related to your case."
        },
        {
            question: "What are your legal fees, and how are they structured?",
            answer: "Our fees vary depending on the complexity and type of case. We offer hourly rates, flat fees, and contingency fees for certain cases."
        }
    ];
    return (
        <div className="text-center">
            <div className=''>
                <div className="text-center max-w-xs md:max-w-lg lg:max-w-2xl mx-auto my-7 md:my-10 lg:my-14">
                    <h1 className="mb-5 text-xl md:text-2xl lg:text-4xl font-extrabold font-Garamond">Commonly Asked
                        Questions</h1>
                    <p className="mb-5 text-gray-500 text-xs md:text-sm lg:text-base">Have questions? We have answers.
                        Explore our frequently asked questions to learn more about our services and how we can
                        assist you.</p>
                </div>
            </div>

            <div className="w-11/12 md:w-9/12 mx-auto my-8 p-8 lg:flex justify-between gap-5 border border-gray-500 rounded-2xl">

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                            <div className="collapse-title text-xl font-medium">
                                {faq.question}
                            </div>
                            <div className="collapse-content">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className=" flex justify-start mt-8 lg:mt-0">
                    <img src="./images/faq.png" alt="" className="" />
                </div>
            </div>
        </div>
    );
};

export default FAQs;