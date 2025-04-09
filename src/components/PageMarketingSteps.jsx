import { useRef, useEffect, useState } from "react"
import { Check } from "lucide-react"
import { marketingSteps } from "../utils/steps"
import logotest from "../assets/Imagen de test.svg"

export default function DentalMarketingSteps() {
  const stepsRefs = useRef([])
  const connectorsRefs = useRef([])
  const [connectorHeights, setConnectorHeights] = useState([])
  const [connectorFillPercentages, setConnectorFillPercentages] = useState([])

  useEffect(() => {
    const calculateConnectorHeights = () => {
      const heights = []

      for (let i = 0; i < stepsRefs.current.length - 1; i++) {
        const currentStep = stepsRefs.current[i]
        const nextStep = stepsRefs.current[i + 1]

        if (currentStep && nextStep) {

          const currentStepNumberElement = currentStep.querySelector(".step-number")
          const nextStepNumberElement = nextStep.querySelector(".step-number")

          if (currentStepNumberElement && nextStepNumberElement) {
            const currentNumberRect = currentStepNumberElement.getBoundingClientRect()
            const nextNumberRect = nextStepNumberElement.getBoundingClientRect()

            const distance = nextNumberRect.top - currentNumberRect.bottom
            heights.push(distance)
          }
        }
      }

      setConnectorHeights(heights)
    }

    calculateConnectorHeights()
    window.addEventListener("resize", calculateConnectorHeights)

    return () => {
      window.removeEventListener("resize", calculateConnectorHeights)
    }
  }, [])

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const windowHeight = window.innerHeight
          const scrollY = window.scrollY

          const newFillPercentages = connectorsRefs.current.map((connector) => {
            if (!connector) return 0

            const rect = connector.getBoundingClientRect()
            const connectorTop = rect.top + scrollY
            const connectorBottom = rect.bottom + scrollY

            const startFill = connectorTop - windowHeight
            const endFill = connectorBottom
            const scrollRange = endFill - startFill

            const fillPercentage = Math.max(0, Math.min(100, ((scrollY - startFill) / scrollRange) * 100))

            return fillPercentage
          })

          setConnectorFillPercentages(newFillPercentages)
          ticking = false
        })

        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // inicial

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [connectorHeights])


  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#01443a] text-white">
        <div className="max-w-7xl mx-auto relative">
          {marketingSteps.map((step, index) => (
            <div key={step.id} className="lg:py-10 px-4" ref={(el) => (stepsRefs.current[index] = el)}>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8">
                <div className="flex justify-center lg:mt-6">
                  <img
                    src={logotest}
                    alt="Ejemplo"
                    width="200"
                    height="200"
                    className="hidden lg:block w-full h-auto"
                  />
                </div>


                {/* Contenido */}
                <div className="relative flex md:flex-row flex-col items-start -top-12">
                  {/* Bloque número + barra */}
                  <div className="relative w-[60px] shrink-0 mr-0">
                    <div
                      className="text-[42px] text-white step-number relative z-10"
                      style={{ fontFamily: '"Inter", sans-serif', fontWeight: 700 }}
                    >
                      {step.id}
                    </div>

                    {/* Barra de progreso */}
                    {index < marketingSteps.length - 1 && (
                      <div
                        className="absolute left-[20px] md:left-[25px] transform -translate-x-1/2 w-1 bg-[#00352d] z-0"
                        style={{
                          top: "66px",
                          height: `${connectorHeights[index] - 30}px`,
                        }}
                        ref={(el) => (connectorsRefs.current[index] = el)}
                      >
                        <div
                          className="w-1 transition-all duration-300 ease-in-out"
                          style={{
                            height: `${connectorFillPercentages[index] || 0}%`,
                            background: `linear-gradient(to bottom, #25c19b 0%, #25c19b ${connectorFillPercentages[index]}%)`,
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="max-w-md lg:mt-4 mt-0 lg:mr-0 ml-10">
                    <h3 className="text-[28px] font-medium text-white mb-2">{step.title}</h3>
                    <p className="text-[18px] text-white mb-6">{step.description}</p>
                    <div className="space-y-3">
                      {step.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center p-3 bg-[#8fc29f]/40 rounded-lg">
                          <div className="w-6 h-6 rounded-full bg-[#006a5a] flex items-center justify-center mr-3">
                            <Check className="text-white w-4 h-4" />
                          </div>
                          <p className="text-white font-medium">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

