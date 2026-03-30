import { connection } from 'next/server';
import { Suspense } from 'react';

export default function DotEnvInspector() {
  return (
    <div className='flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <StaticInspector />
      <Suspense fallback={<div>dynamic MY_DOTENV: Loading...</div>}>
        <DynamicInspector />
      </Suspense>
      <CachedInspector />
    </div>
  );
}

export function StaticInspector() {
  const dotenv = process.env.MY_DOTENV;

  return <div>static MY_DOTENV: {dotenv == null ? 'undefined' : dotenv}</div>;
}

export async function DynamicInspector() {
  await connection();

  const dotenv = process.env.MY_DOTENV;

  return <div>dynamic MY_DOTENV: {dotenv == null ? 'undefined' : dotenv}</div>;
}

export async function CachedInspector() {
  'use cache';
  const dotenv = process.env.MY_DOTENV;

  return <div>cached MY_DOTENV: {dotenv == null ? 'undefined' : dotenv}</div>;
}
