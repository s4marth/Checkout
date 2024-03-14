// atoms.js
"use client";
import { RecoilRoot, atom } from 'recoil';

export const totalAmountState = atom({
  key: 'totalAmountState',
  default: 0,
});

export const productsState = atom({
  key: 'productsState',
  default: [],
});

export default function RecoidContextProvider({ children }) {
    return <RecoilRoot>{children}</RecoilRoot>;
}
