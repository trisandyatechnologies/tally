import { Flex } from "antd";
import Link from "next/link";

export default async function Payment() {
  return (
    <main>
      <Flex vertical>
        <Link href="/payment/cash">Record Cash Payment</Link>
        <Link href="/payment/digital">Record Digital Payment</Link>
      </Flex>
    </main>
  );
}
