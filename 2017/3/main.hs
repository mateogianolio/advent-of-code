parse :: String -> Int
parse x = read x :: Int

isqrt :: Int -> Float
isqrt = sqrt . fromIntegral

distance :: (Int, Int) -> Int
distance (x, y) = abs(x) + abs(y)

spiral :: Int -> (Int, Int)
spiral n
  | n >= m - v      = (k - (m - n), -k)
  | n >= m - 2 * v  = (-k, -k + (m - v - n))
  | n >= m - 3 * v  = (-k + (m - 2 * v - n), k)
  | otherwise       = (k, k - (m - 3 * v - n))
  where
    k = ceiling (((isqrt n) - 1)  / 2)
    t = 2 * k + 1
    v = t - 1
    m = t^2

disp :: Show a => a -> IO ()
disp = putStrLn . show

main = do
  input <- getContents

  let n = parse input
  let a1 = distance $ spiral n

  disp a1
