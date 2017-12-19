parse :: String -> [Int]
parse = map (read . (:""))

-- shift (or rotate) list by n steps
shift :: Int -> [Int] -> [Int]
shift n xs = drop n xs ++ take n xs

-- create shift pairs from list
pair :: Int -> [Int] -> [(Int, Int)]
pair n xs = zip xs (shift n xs)

-- reduce 
reduce :: Int -> (Int, Int) -> Int
reduce acc (x, y)
  | x == y = acc + x
  | otherwise = acc

disp :: Show a => a -> IO ()
disp = putStrLn . show

main = do
  input <- getContents

  let list = parse input
  let a1 = foldl reduce 0 $ pair 1 list

  disp a1

  let distance = (length list) `div` 2
  let a2 = foldl reduce 0 $ pair distance list

  disp a2
