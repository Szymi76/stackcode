import Cards from "./Cards";
import NoMoreProblems from "./NoMoreProblems";
import Welcome from "./Welcome";
import WhyUs from "./WhyUs";

const index = () => {
  document.title = "Stackcode";

  return (
    <>
      <Welcome />
      <WhyUs />
      <NoMoreProblems />
      <Cards />
    </>
  );
};

export default index;
