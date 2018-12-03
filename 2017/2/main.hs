parse :: String -> [[Int]]
parse = map (map read . words) . lines

diff :: [Int] -> Int
diff xs = maximum xs - minimum xs

pair :: [Int] -> [(Int, Int)]
pair xs = [(x, y) | x <- xs, y <- xs, x < y]

disp :: Show a => a -> IO ()
disp = putStrLn . show

reduce :: Int -> (Int, Int) -> Int
reduce acc (x, y)
  | y `rem` x == 0 = acc + y `div` x
  | otherwise = acc

main = do
  input <- getContents

  let rows = parse input
  let a1 = foldl (+) 0 (map diff rows)

  disp a1

  let a2 = sum $ map (foldl reduce 0 . pair) rows

  disp a2
