import { ReactNode } from "react";
import { Progress } from "./progress";
import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MultiStepFormProps {
  currentStep: number;
  totalSteps: number;
  children: ReactNode;
  onNext?: () => void;
  onPrev?: () => void;
  onSubmit?: () => void;
  nextDisabled?: boolean;
  isLastStep?: boolean;
  isSubmitting?: boolean;
}

export function MultiStepForm({
  currentStep,
  totalSteps,
  children,
  onNext,
  onPrev,
  onSubmit,
  nextDisabled = false,
  isLastStep = false,
  isSubmitting = false,
}: MultiStepFormProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-travel-medium">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm font-medium text-travel-medium">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Form Content */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 text-gray-900 dark:text-gray-100">
        {children}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={onPrev}
            disabled={currentStep === 1}
            className="flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {isLastStep ? (
            <Button
              type="button"
              onClick={onSubmit}
              disabled={nextDisabled || isSubmitting}
              className="bg-travel-teal hover:bg-travel-teal/90 text-white flex items-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <span className="mr-2">✨</span>
                  Generate My Itinerary
                </>
              )}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={onNext}
              disabled={nextDisabled}
              className="bg-travel-teal hover:bg-travel-teal/90 text-white flex items-center"
            >
              Next Step
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
