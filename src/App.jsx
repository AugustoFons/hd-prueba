import logohd from './assets/Logo Test.svg'
import './App.css'
import PageMarketingSteps from './components/PageMarketingSteps';

function App() {

  return (
    <>
      <header className="flex justify-center items-center p-0 bg-[#eef5f4]">
        <div className="text-center">
          <img src={logohd} alt="logo" />
        </div>
      </header>
      <main>
        <div className="bg-[#01443a] text-white py-16 px-4 text-center">
          <h2 className="text-[32px] font-medium max-w-3xl mx-auto leading-tight lg:mt-10">
            Aprende de Nuestro Metodo Especializado de Marketing Dental
            <span className="inline-block ml-2">🦷</span>
          </h2>
        </div>
        <PageMarketingSteps />
      </main>
    </>

  );
}

export default App
