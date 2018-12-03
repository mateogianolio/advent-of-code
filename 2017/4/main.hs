import Data.List

parse :: String -> [[String]]
parse = map words . lines

unique :: [String] -> Bool
unique [] = True
unique (x:xs) = x `notElem` xs && unique xs

disp :: Show a => a -> IO ()
disp = putStrLn . show

main = do
  input <- getContents

  let rows = parse input
  let a1 = length $ filter unique rows

  disp a1

  let a2 = length $ filter (unique . map sort) rows

  disp a2
