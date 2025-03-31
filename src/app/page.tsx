import { SelectItem, Selector } from "@/components/base-selector";
import { SelectorProvider } from "@/components/base-selector/selector-provider";
import { Switch } from "@/components/test/switch";

export default function Home() {
  return (
    <>
      <Switch disabled={true}></Switch>

      <SelectorProvider>
        <Selector>
          <SelectItem value="Option 1">Option 1</SelectItem>
          <SelectItem value="Option 2">Option 2</SelectItem>
        </Selector>
      </SelectorProvider>
    </>
  );
}
