import qualified Data.Vector as V

parse :: String -> V.Vector Int
parse = V.fromList . map read . lines

escape :: Int -> V.Vector Int -> Bool
escape n xs = n < 0 || n + 1 > length xs

jump :: Int -> Int -> V.Vector Int -> Int
jump n step xs
  | escape n xs  = step
  | otherwise    = jump (n + x) (step + 1) (V.update xs (V.fromList [(n, value)]))
  where
    x = xs V.! n
    value = (x + 1)

jumpSlow :: Int -> Int -> V.Vector Int -> Int
jumpSlow n step xs
  | escape n xs  = step
  | otherwise    = jumpSlow (n + x) (step + 1) (V.update xs (V.fromList [(n, value)]))
  where
    x = xs V.! n
    value
      | x >= 3 = (x - 1)
      | otherwise = (x + 1)

disp :: Show a => a -> IO ()
disp = putStrLn . show

main = do
  input <- getContents

  let list = parse input
  let a1 = jump 0 0 list

  disp a1

  let a2 = jumpSlow 0 0 list

  disp a2
