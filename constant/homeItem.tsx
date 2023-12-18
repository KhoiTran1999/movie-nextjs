import type { MenuProps } from "antd";
import Link from "next/link";
import { CaretDownOutlined } from "@ant-design/icons";

export const homeItems: MenuProps["items"] = [
  {
    key: "home",
    label: (
      <div>
        Home <CaretDownOutlined />
      </div>
    ),
    children: [
      {
        key: "1",
        label: <Link href="/">Home</Link>,
      },
      {
        key: "2",
        label: <Link href="/movie">Movie</Link>,
      },
      {
        key: "3",
        label: <Link href="/tvshow">TV Show</Link>,
      },
      {
        key: "4",
        label: <Link href="/video">Video</Link>,
      },
      {
        key: "5",
        label: <Link href="/merchandisStore">Merchandis Store</Link>,
      },
    ],
  },
  {
    key: "features",
    label: (
      <div>
        features <CaretDownOutlined />
      </div>
    ),
    children: [
      {
        key: "6",
        label: <Link href="/">Home</Link>,
      },
      {
        key: "7",
        label: <Link href="/restrictedContent">Restricted Content</Link>,
      },
      {
        key: "8",
        label: <Link href="/relatedMerchandise">Related Merchandise</Link>,
      },
      {
        key: "9",
        label: <Link href="/playlist">Playlist</Link>,
      },
      {
        key: "10",
        label: <Link href="/genres">Genres</Link>,
      },
      {
        key: "11",
        label: <Link href="/cast">Cast</Link>,
      },
      {
        key: "12",
        label: <Link href="/tags">Tags</Link>,
      },
    ],
  },
  {
    key: "pages",
    label: (
      <div>
        pages <CaretDownOutlined />
      </div>
    ),
    children: [
      {
        key: "13",
        label: <Link href="/aboutUs">About Us</Link>,
      },
      {
        key: "14",
        label: <Link href="/contactUs">Contact Us</Link>,
      },
      {
        key: "15",
        label: <Link href="/faq">FAQ</Link>,
      },
      {
        key: "16",
        label: <Link href="/privacyPolicy">Privacy Policy</Link>,
      },
      {
        key: "17",
        label: <Link href="/commingSoon">Comming Soon</Link>,
      },
    ],
  },
  {
    key: "shop",
    label: (
      <div>
        Shop <CaretDownOutlined />
      </div>
    ),
    children: [
      {
        key: "18",
        label: <Link href="/shop">Shop</Link>,
      },
      {
        key: "19",
        label: <Link href="/myAccountPage">My Account Page</Link>,
      },
      {
        key: "20",
        label: <Link href="/cartPage">Cart Page</Link>,
      },
      {
        key: "21",
        label: <Link href="/checkOutPage">Checkout Page</Link>,
      },
      {
        key: "22",
        label: <Link href="/orderTracking">Order Tracking</Link>,
      },
    ],
  },
];
