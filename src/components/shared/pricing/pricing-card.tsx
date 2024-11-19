import { Check, MessageCircleWarning, X, Zap } from "lucide-react";

import { cn } from "@/lib/utils";
import { type PricingPlans } from "@/components/shared/pricing/pricing-data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = PricingPlans & {
  isYearly: boolean;
};

export default function PricingCard({
  title,
  monthlyPrice,
  yearlyPrice,
  description,
  features,
  isOneTimePayment,
  notice,
  isYearly,
  isMain,
  excludedFeatures,
}: Props) {
  return (
    <Card
      className={cn("z-50 flex h-full flex-col", {
        "card-shadow card-box relative bg-[#18181b] text-white dark:bg-transparent": isMain,
      })}
    >
      <CardHeader>
        <CardTitle className="space-y-1 font-bold">
          <p className={cn(isMain && "text-white")}>{title}</p>
          <p
            className={cn("text-3xl font-bold text-black dark:text-white", {
              "text-white": isMain,
            })}
          >
            ${isYearly ? yearlyPrice : monthlyPrice}
            {isOneTimePayment ? (
              <span className="ml-1 text-xs">one time payment</span>
            ) : (
              <span className="text-xs">{isYearly ? "/yearly" : "/mo"}</span>
            )}
          </p>
        </CardTitle>
        <CardDescription className={cn("dark:text-neutral-100", isMain && "text-muted")}>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="pb-6">
          <Button
            variant="outline"
            className={cn("w-full py-5 font-semibold hover:bg-black hover:text-white", {
              "bg-white text-black": isMain,
            })}
          >
            Get Started
            <Zap className="ml-2 size-4 fill-yellow-500 text-yellow-500" />
          </Button>
        </form>

        <p className="font-bold">What&apos;s included:</p>
        <ul
          className={cn("space-y-1 pt-2 text-muted-foreground", {
            "text-muted": isMain,
          })}
        >
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-1 text-xs">
              <Check className="size-4 text-green-500" />
              <span className="dark:dark:text-neutral-400">{feature}</span>
            </li>
          ))}
          {excludedFeatures?.map((feature) => (
            <li key={feature} className="flex items-center gap-1 text-xs">
              <X className="size-4 text-red-500" />
              <span className="text-gray-700 dark:dark:text-neutral-400">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter
        className={cn("text-xs text-muted-foreground", {
          "text-muted": isMain,
        })}
      >
        <div className="flex gap-2 dark:dark:text-neutral-200">
          {notice && <MessageCircleWarning className="size-8" />}

          {notice}
        </div>
      </CardFooter>
    </Card>
  );
}
